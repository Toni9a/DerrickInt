import React, { useState } from "react";
import styles from "./Flashcards.module.css";
import { FLASHCARDS } from "../data/flashcards";

const Flashcards = ({ onClose }) => {
    const [current, setCurrent] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const next = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % FLASHCARDS.length);
        }, 150);
    };

    const prev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
        }, 150);
    };

    const card = FLASHCARDS[current];

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.category}>{card.category}</div>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.cardContainer} onClick={() => setIsFlipped(!isFlipped)}>
                    <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
                        <div className={styles.cardFront}>
                            <div className={styles.question}>{card.question}</div>
                            <div className={styles.hint} style={{ marginTop: 'auto' }}>Click to reveal answer</div>
                        </div>
                        <div className={styles.cardBack}>
                            <div className={styles.answer}>{card.answer}</div>
                            {card.tip && (
                                <div className={styles.tipBox}>
                                    <span>💡</span>
                                    <div>{card.tip}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button className={styles.navBtn} onClick={prev}>PREV</button>
                    <div className={styles.progress}>{current + 1} / {FLASHCARDS.length}</div>
                    <button className={styles.navBtn} onClick={next}>NEXT</button>
                </div>

                <div className={styles.hint}>Click the card to flip between question and answer</div>
            </div>
        </div>
    );
};

export default Flashcards;
