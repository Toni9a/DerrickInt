import React from "react";
import styles from "./ResultsScreen.module.css";

const ResultsScreen = ({
    category,
    score,
    total,
    onRetry,
    onHome,
    completedCategories,
    categories
}) => {
    const pct = Math.round((score / total) * 100);

    const getFeedback = (p) => {
        if (p >= 90) return "Outstanding — you're ready to impress the panel! 🏆";
        if (p >= 75) return "Strong performance — sharpen the edge cases! 💪";
        if (p >= 60) return "Good foundation — revisit explanations for weaker areas 📖";
        if (p >= 40) return "Keep practising — focus on the technical fundamentals 🔬";
        return "Early days — review the materials and come back! 🚀";
    };

    return (
        <div className={styles.results}>
            <div className={styles.resultsCard}>
                <div className={styles.badge}>
                    {category?.label?.toUpperCase()} — COMPLETE
                </div>
                <div
                    className={styles.scoreCircle}
                    style={{
                        background: `conic-gradient(${pct > 70 ? "#22c55e" : pct > 40 ? "#f7931e" : "#ef4444"} ${pct * 3.6}deg, rgba(255,255,255,0.05) 0)`
                    }}
                >
                    <div className={styles.scoreInner}>
                        <div className={styles.scoreNum}>{pct}%</div>
                        <div className={styles.scoreSub}>{score}/{total}</div>
                    </div>
                </div>
                <div
                    className={styles.feedbackMsg}
                    style={{ color: pct > 70 ? "#22c55e" : pct > 40 ? "#f7931e" : "#a78bfa" }}
                >
                    {getFeedback(pct)}
                </div>
                <div className={styles.feedbackSub}>
                    {score === total ? "Perfect score! Every answer was spot on." :
                        `${total - score} question${total - score > 1 ? "s" : ""} to review — check the explanations above.`}
                </div>

                <div className={styles.actions}>
                    <button
                        className={`${styles.btn} ${styles.retryBtn}`}
                        style={{
                            background: `linear-gradient(135deg, ${category?.color}, ${category?.color}cc)`,
                            boxShadow: `0 4px 20px ${category?.color}40`
                        }}
                        onClick={onRetry}
                    >
                        RETRY THIS CATEGORY
                    </button>
                    <button className={`${styles.btn} ${styles.homeBtn}`} onClick={onHome}>
                        ← ALL CATEGORIES
                    </button>
                </div>
            </div>

            {Object.keys(completedCategories).length > 0 && (
                <div className={styles.breakdown}>
                    <div className={styles.breakdownTitle}>CATEGORY BREAKDOWN</div>
                    {categories.filter(c => completedCategories[c.id]).map(c => {
                        const d = completedCategories[c.id];
                        const p = Math.round((d.score / d.total) * 100);
                        return (
                            <div key={c.id} className={styles.breakdownItem}>
                                <span className={styles.itemIcon}>{c.icon}</span>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemHeader}>
                                        <span className={styles.itemLabel} style={{ color: c.color }}>{c.label}</span>
                                        <span className={styles.itemScoreText}>{d.score}/{d.total}</span>
                                    </div>
                                    <div className={styles.itemTrack}>
                                        <div
                                            className={styles.itemBar}
                                            style={{ width: `${p}%`, background: c.color }}
                                        />
                                    </div>
                                </div>
                                <span
                                    className={styles.itemPct}
                                    style={{ color: p >= 70 ? "#22c55e" : p >= 40 ? "#f7931e" : "#ef4444" }}
                                >
                                    {p}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className={styles.footerNote}>
                You've got this, Derrick. The panel are going to be impressed. 💪
            </div>
        </div>
    );
};

export default ResultsScreen;
