import React from "react";
import styles from "./CategoryCard.module.css";
import { ALL_QUESTIONS } from "../data/questions";

const CategoryCard = ({ category, done, onClick, index }) => {
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    };

    const count = ALL_QUESTIONS.filter(q => q.category === category.id).length;

    return (
        <div
            className={styles.card}
            style={{
                background: done ? `rgba(${hexToRgb(category.color)}, 0.15)` : "rgba(255,255,255,0.03)",
                border: `1px solid ${done ? category.color : "rgba(255,255,255,0.08)"}`,
                animationDelay: `${index * 0.08}s`
            }}
            onClick={onClick}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 12px 40px ${category.color}25`;
                e.currentTarget.style.borderColor = category.color + "80";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = done ? category.color : "rgba(255,255,255,0.08)";
            }}
        >
            {done && (
                <div
                    className={styles.score}
                    style={{
                        background: `rgba(${hexToRgb(category.color)}, 0.2)`,
                        color: category.color
                    }}
                >
                    {done.score}/{done.total} ✓
                </div>
            )}
            <div className={styles.icon} style={{ fontSize: '28px' }}>{category.icon}</div>
            <div className={styles.label} style={{ color: category.color }}>{category.label}</div>
            <div className={styles.desc}>{category.desc}</div>
            <div className={styles.action} style={{ color: category.color }}>
                {count} QUESTIONS →
            </div>
        </div>
    );
};

export default CategoryCard;
