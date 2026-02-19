import React, { useState } from "react";
import "./styles/globals.css";
import { CATEGORIES } from "./data/categories";
import { ALL_QUESTIONS } from "./data/questions";
import { useQuiz } from "./hooks/useQuiz";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import StudyNotes from "./components/StudyNotes";
import LiveInterviewMode from "./components/LiveInterviewMode";
import Flashcards from "./components/Flashcards";
import { INTRO_PRACTICE_QUESTIONS } from "./data/introQuestions";

function App() {
  const quiz = useQuiz(ALL_QUESTIONS, CATEGORIES);
  const [isLiveInterviewOpen, setIsLiveInterviewOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isIntroPracticeActive, setIsIntroPracticeActive] = useState(false);

  const totalPossible = Object.values(quiz.completedCategories).reduce((a, b) => a + b.total, 0);
  const totalScore = Object.values(quiz.completedCategories).reduce((a, b) => a + b.score, 0);

  const q = quiz.questions[quiz.currentQ];
  const cat = CATEGORIES.find(c => c.id === quiz.selectedCategory);

  return (
    <div className="app-container">
      <div className="grid-overlay" />

      <main className="content-wrapper">
        {quiz.screen === "home" && (
          <HomeScreen
            categories={CATEGORIES}
            completedCategories={quiz.completedCategories}
            startCategory={quiz.startCategory}
            totalScore={totalScore}
            totalPossible={totalPossible}
            showBookmarksOnly={quiz.showBookmarksOnly}
            setShowBookmarksOnly={quiz.setShowBookmarksOnly}
            bookmarksCount={quiz.bookmarks.length}
            onOpenFlashcards={() => setIsFlashcardsOpen(true)}
            onStartIntroPractice={() => setIsIntroPracticeActive(true)}
          />
        )}

        {quiz.screen === "quiz" && q && (
          <QuizScreen
            question={q}
            currentIdx={quiz.currentQ}
            total={quiz.questions.length}
            score={quiz.score}
            handleAnswer={quiz.handleAnswer}
            selectedAnswer={quiz.selectedAnswer}
            showExplanation={quiz.showExplanation}
            nextQuestion={quiz.nextQuestion}
            category={cat}
            onBack={() => quiz.setScreen("home")}
            isBookmarked={quiz.bookmarks.includes(q.id)}
            toggleBookmark={quiz.toggleBookmark}
            onLiveInterview={() => setIsLiveInterviewOpen(true)}
          />
        )}

        {quiz.screen === "results" && (
          <ResultsScreen
            category={cat}
            score={quiz.score}
            total={quiz.questions.length}
            onRetry={() => quiz.startCategory(quiz.selectedCategory)}
            onHome={() => quiz.setScreen("home")}
            completedCategories={quiz.completedCategories}
            categories={CATEGORIES}
          />
        )}
      </main>

      <StudyNotes />

      {isLiveInterviewOpen && q && (
        <LiveInterviewMode
          question={q.question}
          idealAnswer={q.explanation}
          onClose={() => setIsLiveInterviewOpen(false)}
        />
      )}

      {isIntroPracticeActive && (
        <LiveInterviewMode
          questions={INTRO_PRACTICE_QUESTIONS}
          onClose={() => setIsIntroPracticeActive(false)}
        />
      )}

      {isFlashcardsOpen && (
        <Flashcards onClose={() => setIsFlashcardsOpen(false)} />
      )}
    </div>
  );
}

export default App;
