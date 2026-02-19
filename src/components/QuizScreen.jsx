import React from "react";
import styles from "./QuizScreen.module.css";
import ProgressBar from "./ProgressBar";
import PanelistCard from "./PanelistCard";
import OptionButton from "./OptionButton";
import DissertationCallout from "./DissertationCallout";
import { PANELISTS } from "../data/panelists";

const QuizScreen = ({
    question,
    currentIdx,
    total,
    score,
    handleAnswer,
    selectedAnswer,
    showExplanation,
    nextQuestion,
    category,
    onBack,
    isBookmarked,
    toggleBookmark,
    onLiveInterview
}) => {
    const q = question;
    const panelist = PANELISTS[q.panelist];
    const pct = Math.round((currentIdx / total) * 100);

    return (
        <div className={styles.quiz}>
            <div className={styles.quizHeader}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>{category?.icon}</span>
                    <span style={{ color: category?.color, fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>
                        {category?.label?.toUpperCase()}
                    </span>
                </div>
                <div className={styles.progressContainer}>
                    <span className={styles.progressText}>{currentIdx + 1} / {total}</span>
                    <ProgressBar pct={pct} color={category?.color} />
                    <span className={styles.scoreText}>{score} ✓</span>
                </div>
            </div>

            <div className={styles.questionHeader}>
                <PanelistCard
                    panelist={panelist}
                    difficulty={q.difficulty}
                />
                <button
                    className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarkBtnActive : ""}`}
                    onClick={() => toggleBookmark(q.id)}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                >
                    {isBookmarked ? "🔖" : "📑"}
                </button>
            </div>

            <div className={styles.questionCard}>
                <div className={styles.questionText}>{q.question}</div>
            </div>

            <div className={styles.optionsList}>
                {q.options.map((opt, idx) => (
                    <OptionButton
                        key={idx}
                        index={idx}
                        text={opt}
                        correct={q.correct}
                        selected={selectedAnswer}
                        showExplanation={showExplanation}
                        onClick={() => handleAnswer(idx)}
                    />
                ))}
            </div>

            {showExplanation && (
                <div>
                    <div className={styles.explanationBox}>
                        <div className={styles.explanationTitle}>
                            {selectedAnswer === q.correct ? "✓ CORRECT — " : "✗ INCORRECT — "}EXPLANATION
                        </div>
                        <div className={styles.explanationText}>{q.explanation}</div>
                    </div>

                    {q.dissertation_link && (
                        <DissertationCallout text={q.dissertation_link} />
                    )}

                    <button
                        className={styles.nextBtn}
                        style={{
                            background: `linear-gradient(135deg, ${category?.color}, ${category?.color}cc)`,
                            boxShadow: `0 4px 20px ${category?.color}40`
                        }}
                        onClick={nextQuestion}
                    >
                        {currentIdx + 1 >= total ? "VIEW RESULTS →" : "NEXT QUESTION →"}
                    </button>
                </div>
            )}

            {!showExplanation && (
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <button
                        onClick={onLiveInterview}
                        style={{
                            background: "rgba(167, 139, 250, 0.15)",
                            border: "1px solid rgba(167, 139, 250, 0.3)",
                            color: "#a78bfa",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            margin: "0 auto"
                        }}
                    >
                        <span>🎙️</span> Practice Spoken Answer (Live Interview Mode)
                    </button>
                </div>
            )}

            <div className={styles.footerActions}>
                <button className={styles.backBtn} onClick={onBack}>← Back to Categories</button>
            </div>
        </div>
    );
};

export default QuizScreen;
