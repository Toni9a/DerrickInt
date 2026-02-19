import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ pct, color }) => {
    return (
        <div className={styles.track}>
            <div
                className={styles.bar}
                style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}99)`
                }}
            />
        </div>
    );
};

export default ProgressBar;
