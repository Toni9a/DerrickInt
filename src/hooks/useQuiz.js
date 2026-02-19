import { useState, useEffect, useCallback } from "react";

export const useQuiz = (allQuestions, categories) => {
    const [screen, setScreen] = useState("home");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [completedCategories, setCompletedCategories] = useState({});
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

    // Load persistence data
    useEffect(() => {
        const savedProgress = localStorage.getItem("derrick_interview_progress");
        if (savedProgress) {
            setCompletedCategories(JSON.parse(savedProgress));
        }
        const savedBookmarks = localStorage.getItem("derrick_interview_bookmarks");
        if (savedBookmarks) {
            setBookmarks(JSON.parse(savedBookmarks));
        }
    }, []);

    // Save persistence data
    useEffect(() => {
        localStorage.setItem("derrick_interview_progress", JSON.stringify(completedCategories));
    }, [completedCategories]);

    useEffect(() => {
        localStorage.setItem("derrick_interview_bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const startCategory = useCallback((catId) => {
        let catQuestions = allQuestions.filter(q => q.category === catId);

        if (showBookmarksOnly) {
            catQuestions = catQuestions.filter(q => bookmarks.includes(q.id));
        }

        if (catQuestions.length === 0 && showBookmarksOnly) {
            // If no bookmarks in this category, just show all
            catQuestions = allQuestions.filter(q => q.category === catId);
        }

        setQuestions(catQuestions.sort(() => Math.random() - 0.5));
        setSelectedCategory(catId);
        setCurrentQ(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setAnswers([]);
        setScreen("quiz");
    }, [allQuestions, bookmarks, showBookmarksOnly]);

    const handleAnswer = useCallback((idx) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(idx);
        setShowExplanation(true);
        const isCorrect = idx === questions[currentQ].correct;
        if (isCorrect) setScore(s => s + 1);
        setAnswers(a => [...a, { correct: isCorrect, questionId: questions[currentQ].id }]);
    }, [selectedAnswer, questions, currentQ]);

    const nextQuestion = useCallback(() => {
        if (currentQ + 1 >= questions.length) {
            setCompletedCategories(prev => ({
                ...prev,
                [selectedCategory]: { score, total: questions.length, date: new Date().toISOString() }
            }));
            setScreen("results");
        } else {
            setCurrentQ(q => q + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    }, [currentQ, questions, selectedCategory, score]);

    const toggleBookmark = useCallback((questionId) => {
        setBookmarks(prev =>
            prev.includes(questionId)
                ? prev.filter(id => id !== questionId)
                : [...prev, questionId]
        );
    }, []);

    const resetProgress = () => {
        setCompletedCategories({});
        localStorage.removeItem("derrick_interview_progress");
    };

    return {
        screen, setScreen,
        selectedCategory, setSelectedCategory,
        questions, currentQ,
        selectedAnswer, showExplanation,
        score, answers,
        completedCategories,
        bookmarks, toggleBookmark,
        showBookmarksOnly, setShowBookmarksOnly,
        startCategory, handleAnswer, nextQuestion,
        resetProgress
    };
};
