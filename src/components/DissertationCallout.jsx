import React from "react";
import styles from "./DissertationCallout.module.css";

const DissertationCallout = ({ text }) => {
    return (
        <div className={styles.box}>
            <span style={{ fontSize: "16px" }}>🎓</span>
            <div className={styles.text}>
                <span className={styles.label}>Dissertation Connection:</span> {text}
            </div>
        </div>
    );
};

export default DissertationCallout;
