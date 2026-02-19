import React, { useState } from "react";
import styles from "./StudyNotes.module.css";

const StudyNotes = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className={styles.toggleBtn}
                onClick={() => setIsOpen(true)}
                title="Study Notes"
            >
                📚
            </button>

            <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <div className={styles.title}>STUDY REFERENCE</div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>🛡️ IRR17 DOSE LIMITS</div>
                        <div className={styles.noteCard}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Limit (Annual)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Classified Worker</td>
                                        <td>20 mSv (avg over 5y)</td>
                                    </tr>
                                    <tr>
                                        <td>Eye Lens (Worker)</td>
                                        <td>20 mSv</td>
                                    </tr>
                                    <tr>
                                        <td>Extremities/Skin</td>
                                        <td>500 mSv</td>
                                    </tr>
                                    <tr>
                                        <td>Public</td>
                                        <td>1 mSv</td>
                                    </tr>
                                    <tr>
                                        <td>Radon (Indoor)</td>
                                        <td>300 Bq/m³</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>⚛️ KEY EQUATIONS</div>
                        <div className={styles.noteCard}>
                            <div>Attenuation:</div>
                            <div className={styles.formula}>I = I₀e^(-μx)</div>
                            <div style={{ marginTop: "10px" }}>Compton Shift:</div>
                            <div className={styles.formula}>Δλ = (h/m₀c)(1 - cosθ)</div>
                            <div style={{ marginTop: "10px" }}>Inverse Square:</div>
                            <div className={styles.formula}>I₁/I₂ = (d₂/d₁)²</div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>🎓 DISSERTATION KEY FINDINGS</div>
                        <div className={styles.noteCard}>
                            <p style={{ marginBottom: "8px" }}>• ⁴⁰K is the dominant indoor gamma source.</p>
                            <p style={{ marginBottom: "8px" }}>• Dose increases 2x near walls vs center (scatter/proximity).</p>
                            <p style={{ marginBottom: "8px" }}>• Thickness saturation occurs around 12-15cm concrete.</p>
                            <p>• Validated TOPAS vs XCOM mass attenuation coeff.</p>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>🔗 REFERENCE MATERIALS</div>
                        <div className={styles.noteCard}>
                            <ul className={styles.valuesList} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <li>
                                    <span styles={{ fontSize: '14px' }}>📄</span>
                                    <a href="/resources/413_101072_CMPE_AK_Job_Description_&_Person_Specification.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
                                        Job Description & Person Spec
                                    </a>
                                </li>
                                <li>
                                    <span styles={{ fontSize: '14px' }}>📄</span>
                                    <a href="/resources/derrick%20DISSERTATION%20(1).pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
                                        MSc Dissertation (TOPAS/Monte Carlo)
                                    </a>
                                </li>
                                <li>
                                    <span styles={{ fontSize: '14px' }}>📄</span>
                                    <a href="/resources/DQuansah%20CV.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
                                        Derrick Quansah CV
                                    </a>
                                </li>
                                <li>
                                    <span styles={{ fontSize: '14px' }}>📄</span>
                                    <a href="/resources/Interview%20Prep%20for%20the%20Christie.docx" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
                                        Original Prep Notes
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudyNotes;
