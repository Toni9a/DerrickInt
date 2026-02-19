import React, { useState, useEffect, useRef } from "react";
import styles from "./LiveInterviewMode.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const LiveInterviewMode = ({ question, idealAnswer, onClose, questions = [] }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const recognitionRef = useRef(null);

    // Derived values
    const isSequence = questions && questions.length > 1;
    const currentQ = isSequence ? questions[currentStep] : { question, idealAnswer };
    const suggestions = currentQ.suggestions || [];

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = "";
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscription(currentTranscript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setTranscription("");
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const analyzeResponse = async () => {
        if (!transcription) return;

        setIsAnalyzing(true);
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            setAnalysis({
                score: "-",
                feedback: "API Key Missing. Please set VITE_GEMINI_API_KEY in your .env file.",
                strengths: [],
                improvements: ["Configure Gemini API key to get AI feedback."]
            });
            setIsAnalyzing(false);
            return;
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const prompt = `
        You are an expert Medical Physics interviewer at The Christie NHS Foundation Trust. 
        Evaluate Derrick's spoken answer for the following interview question for a Band 5 Clinical Technologist role.

        INTERVIEW QUESTION: "${currentQ.question.replace(/"/g, "'")}"
        ${currentQ.idealAnswer ? `IDEAL CONCEPTUAL ANSWER/EXPLANATION: "${currentQ.idealAnswer.replace(/"/g, "'")}"` : "This is a general competency or introductory question. Evaluate based on confidence, relevance to NHS values, and professional clinical/physics background."}
        DERRICK'S SPOKEN RESPONSE: "${transcription.replace(/"/g, "'")}"

        Please provide a structured evaluation strictly in JSON format with the following fields:
        1. score (integer 1-5)
        2. general_feedback (2-3 sentences. If this is an intro/about me, focus on his 'pitch' quality)
        3. what_was_good (array of 2 specific points mentioned)
        4. areas_for_improvement (array of 2 specific points missed or needing better phrasing)
        5. model_improvement (A short example of how a star candidate would phrase the key part of this answer)

        Context: Derrick (MSc Surrey, clinical background Ghana). The role is Clinical Technologist at The Christie (Cancer Centre).

        Return ONLY the JSON object.
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // More robust JSON extraction
            let jsonStr = text;
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                jsonStr = jsonMatch[0];
            }

            const data = JSON.parse(jsonStr);
            setAnalysis(data);
        } catch (error) {
            console.error("Gemini Analysis Error:", error);
            const isJsonError = error instanceof SyntaxError;
            setAnalysis({
                score: "!",
                feedback: isJsonError
                    ? "Received an invalid response from AI. This usually happens if the response was cut off. Please try 'Analyze' again."
                    : `Analysis failed: ${error.message || "Failed to connect to AI"}. Please check your internet connection or verify your Gemini API key in the .env file.`,
                strengths: [],
                improvements: [
                    isJsonError ? "Retry the analysis" : "Check .env file contains VITE_GEMINI_API_KEY",
                    error.message ? `Error: ${error.message}` : "Connection issue"
                ]
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleNext = () => {
        if (isSequence && currentStep < questions.length - 1) {
            setCurrentStep(s => s + 1);
            setAnalysis(null);
            setTranscription("");
        } else {
            onClose();
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>🎙️ Interview Simulation Mode</div>
                </div>

                <div className={styles.questionCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "1px" }}>QUESTION {isSequence ? `${currentStep + 1}/${questions.length}` : ""}</div>
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.5" }}>{currentQ.question}</div>
                </div>

                {!analysis && !isAnalyzing && (
                    <>
                        {suggestions.length > 0 && (
                            <div className={styles.suggestionsContainer}>
                                {suggestions.map((s, i) => (
                                    <div key={i} className={styles.suggestionChip}>
                                        <span>{s.icon}</span>
                                        <strong>{s.text}</strong>
                                        <span className={styles.suggestionLink}>→ {s.link}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles.listeningIndicator}>
                            <div className={`${styles.pulse} ${isListening ? "" : styles.paused}`} style={{ animationPlayState: isListening ? "running" : "paused", background: isListening ? "#ef4444" : "#4b5563" }}>
                                {isListening ? "🎤" : "🔇"}
                            </div>
                            <div style={{ color: isListening ? "#ef4444" : "var(--text-muted)", fontWeight: "700" }}>
                                {isListening ? "LISTENING..." : "READY TO RECORD"}
                            </div>
                        </div>

                        <div className={`${styles.transcription} ${!transcription ? styles.transcriptionEmpty : ""}`}>
                            {transcription || "Your live transcription will appear here as you speak..."}
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={`${styles.btn} ${isListening ? styles.stopBtn : ""}`}
                                onClick={toggleListening}
                                style={{ background: isListening ? "#ef4444" : "var(--accent-color)", color: isListening ? "white" : "var(--bg-color)" }}
                            >
                                {isListening ? "🛑 STOP LISTENING" : "🎤 START SPEAKING"}
                            </button>

                            {transcription && !isListening && (
                                <button
                                    className={styles.btn}
                                    style={{ background: "#a78bfa", color: "white" }}
                                    onClick={analyzeResponse}
                                >
                                    ✨ ANALYZE WITH GEMINI
                                </button>
                            )}
                        </div>
                    </>
                )}

                {isAnalyzing && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <div style={{ color: "#a78bfa", fontWeight: "700" }}>GEMINI IS ANALYZING YOUR ANSWER...</div>
                    </div>
                )}

                {analysis && (
                    <div className={styles.analysisCard}>
                        <div className={styles.analysisTitle}>
                            <span>✨</span> Interview Expert Feedback
                        </div>

                        <div className={styles.scoreRow}>
                            <div className={styles.scoreBadge}>{analysis.score}</div>
                            <div>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>RATING</div>
                                <div style={{ fontWeight: "700" }}>{analysis.score}/5 Performance</div>
                            </div>
                        </div>

                        <div className={styles.feedbackSection}>
                            <div className={styles.sectionLabel}>OVERALL FEEDBACK</div>
                            <div className={styles.feedbackText}>{analysis.general_feedback || analysis.feedback}</div>
                        </div>

                        <div className={styles.feedbackGrid}>
                            <div className={styles.feedbackSection}>
                                <div className={styles.sectionLabel} style={{ color: "#22c55e" }}>STRENGTHS</div>
                                <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
                                    {(analysis.what_was_good || analysis.strengths || []).map((s, i) => <li key={i} style={{ marginBottom: "4px" }}>{s}</li>)}
                                </ul>
                            </div>
                            <div className={styles.feedbackSection}>
                                <div className={styles.sectionLabel} style={{ color: "#f7931e" }}>TO IMPROVE</div>
                                <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
                                    {(analysis.areas_for_improvement || analysis.improvements || []).map((s, i) => <li key={i} style={{ marginBottom: "4px" }}>{s}</li>)}
                                </ul>
                            </div>
                        </div>

                        {analysis.model_improvement && (
                            <div className={styles.feedbackSection} style={{ marginTop: "10px" }}>
                                <div className={styles.sectionLabel}>PRO TIP</div>
                                <div className={styles.feedbackText} style={{ fontStyle: "italic", borderLeft: "2px solid #a78bfa", paddingLeft: "12px" }}>
                                    "{analysis.model_improvement}"
                                </div>
                            </div>
                        )}

                        <div className={styles.analysisActions}>
                            <button
                                className={styles.btn}
                                style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", flex: 1, justifyContent: "center", fontSize: "13px" }}
                                onClick={() => setAnalysis(null)}
                            >
                                🔄 REDO
                            </button>

                            <button
                                className={styles.btn}
                                style={{ background: "var(--accent-color)", color: "var(--bg-color)", flex: 2, justifyContent: "center" }}
                                onClick={handleNext}
                            >
                                {isSequence && currentStep < questions.length - 1 ? "NEXT QUESTION ➡️" : "FINISH SESSION ✅"}
                            </button>
                        </div>
                    </div>
                )}

                <div style={{ textAlign: "center" }}>
                    <button className={styles.closeBtn} onClick={onClose}>EXIT SIMULATION</button>
                </div>
            </div>
        </div>
    );
};

export default LiveInterviewMode;
