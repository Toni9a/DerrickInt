import React, { useState, useEffect } from "react";
import styles from "./HomeScreen.module.css";
import CategoryCard from "./CategoryCard";
import { PANELISTS } from "../data/panelists";
import { TIPS } from "../data/tips";

const HomeScreen = ({
    categories,
    completedCategories,
    startCategory,
    totalScore,
    totalPossible,
    showBookmarksOnly,
    setShowBookmarksOnly,
    bookmarksCount,
    onOpenFlashcards,
    onStartIntroPractice
}) => {
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex(i => (i + 1) % TIPS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const resultPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return (
        <div className={styles.home}>
            <header className={styles.header}>
                <div className={styles.badge}>Christie NHS — DRRPS Interview Prep</div>
                <h1 className={styles.title}>Panel Ready?</h1>
                <h2 className={styles.title} style={{ fontSize: "clamp(16px, 3vw, 24px)" }}>
                    Derrick's Interview Command Centre
                </h2>
                <p className={styles.subtitle}>
                    Band 5 Clinical Technologist · Diagnostic Radiology · Christie Medical Physics & Engineering
                </p>
            </header>

            <div className={styles.panel}>
                {Object.values(PANELISTS).map(p => (
                    <div
                        key={p.name}
                        className={styles.panelBadge}
                        style={{
                            background: `rgba(${hexToRgb(p.color)}, 0.1)`,
                            border: `1px solid ${p.color}40`,
                            color: p.color
                        }}
                    >
                        <div className={styles.panelDot} style={{ background: p.color }} />
                        <span>{p.name}</span>
                    </div>
                ))}
            </div>

            <div className={styles.tipTicker}>
                <span style={{ fontSize: "20px" }}>{TIPS[tipIndex].icon}</span>
                <span>{TIPS[tipIndex].tip}</span>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", justifyContent: "center" }}>
                <button
                    onClick={onStartIntroPractice}
                    style={{
                        background: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
                        color: "white", padding: "12px 24px", borderRadius: "12px",
                        border: "none", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px"
                    }}
                >
                    <span>🎙️</span> Practice Intro / About Me
                </button>
                <button
                    onClick={onOpenFlashcards}
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--accent-color)", border: "1px solid var(--accent-color)40",
                        padding: "12px 24px", borderRadius: "12px", fontWeight: "700",
                        display: "flex", alignItems: "center", gap: "8px"
                    }}
                >
                    <span>🎴</span> Review Christie Flashcards
                </button>
            </div>

            <div className={styles.filterBar}>
                <button
                    className={`${styles.filterBtn} ${showBookmarksOnly ? styles.filterBtnActive : ""}`}
                    onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                >
                    <span>🔖</span>
                    {showBookmarksOnly ? "Showing Flagged Questions" : `Focus on Flagged (${bookmarksCount})`}
                </button>
            </div>

            {totalPossible > 0 && (
                <div className={styles.overallBar}>
                    <div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "4px" }}>
                            OVERALL PROGRESS
                        </div>
                        <div style={{ fontSize: "22px", fontWeight: "900", color: "var(--accent-color)" }}>
                            {totalScore}/{totalPossible} correct
                        </div>
                    </div>
                    <div className={styles.scoreBox}>
                        <div style={{ fontSize: "24px", fontWeight: "900", color: "var(--accent-color)" }}>{resultPct}%</div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>cumulative</div>
                    </div>
                </div>
            )}

            <div className={styles.catGrid}>
                {categories.map((cat, i) => (
                    <CategoryCard
                        key={cat.id}
                        category={cat}
                        done={completedCategories[cat.id]}
                        onClick={() => startCategory(cat.id)}
                        index={i}
                    />
                ))}
            </div>

            <div className={styles.footer}>
                Built for Derrick Quansah · BSc Diagnostic Radiography (Ghana) · MSc Medical Physics (Surrey) · Good luck with the panel! 🩺
            </div>
        </div>
    );
};

const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
};

export default HomeScreen;
