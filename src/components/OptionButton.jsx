import React from "react";
import styles from "./OptionButton.module.css";

const OptionButton = ({ index, text, correct, selected, showExplanation, onClick }) => {
    const letters = ["A", "B", "C", "D"];

    let dynamicStyle = {};
    if (showExplanation) {
        if (index === correct) {
            dynamicStyle = { background: "rgba(34,197,94,0.12)", border: "1px solid #22c55e60", color: "#22c55e" };
        } else if (index === selected && index !== correct) {
            dynamicStyle = { background: "rgba(239,68,68,0.12)", border: "1px solid #ef444460", color: "#ef4444" };
        }
    } else if (index === selected) {
        dynamicStyle = { background: "rgba(var(--accent-color-rgb), 0.1)", border: "1px solid rgba(var(--accent-color-rgb), 0.5)", color: "var(--accent-color)" };
    }

    return (
        <button
            className={`${styles.btn} ${showExplanation ? styles.disabled : ""}`}
            style={dynamicStyle}
            onClick={onClick}
            disabled={showExplanation}
        >
            <span className={styles.letter}>{letters[index]}</span>
            <span className={styles.text}>{text}</span>
            {showExplanation && index === correct && <span className={styles.status} style={{ color: "#22c55e" }}>✓</span>}
            {showExplanation && index === selected && index !== correct && <span className={styles.status} style={{ color: "#ef4444" }}>✗</span>}
        </button>
    );
};

export default OptionButton;
