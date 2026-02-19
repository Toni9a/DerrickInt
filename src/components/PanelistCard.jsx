import React from "react";
import styles from "./PanelistCard.module.css";

const PanelistCard = ({ panelist, difficulty }) => {
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    };

    const getDiffStyles = (d) => {
        if (d === "easy") return { bg: "rgba(34,197,94,0.15)", color: "#22c55e", border: "#22c55e30" };
        if (d === "medium") return { bg: "rgba(247,147,30,0.15)", color: "#f7931e", border: "#f7931e30" };
        return { bg: "rgba(239,68,68,0.15)", color: "#ef4444", border: "#ef444430" };
    };

    const ds = getDiffStyles(difficulty);

    return (
        <div
            className={styles.card}
            style={{
                background: `rgba(${hexToRgb(panelist.color)}, 0.08)`,
                border: `1px solid ${panelist.color}40`
            }}
        >
            <div
                className={styles.avatar}
                style={{
                    background: `rgba(${hexToRgb(panelist.color)}, 0.25)`,
                    border: `2px solid ${panelist.color}60`,
                    color: panelist.color
                }}
            >
                {panelist.initials}
            </div>
            <div className={styles.info}>
                <div className={styles.name} style={{ color: panelist.color }}>{panelist.name} asks:</div>
                <div className={styles.role}>Panel Member · The Christie NHS Foundation Trust</div>
            </div>
            <div
                className={styles.diffBadge}
                style={{ background: ds.bg, color: ds.color, borderColor: ds.border }}
            >
                {difficulty}
            </div>
        </div>
    );
};

export default PanelistCard;
