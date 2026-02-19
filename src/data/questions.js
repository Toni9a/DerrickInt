export const ALL_QUESTIONS = [
    // RADIATION PHYSICS
    {
        id: 1, category: "radiation-physics", panelist: "craig", difficulty: "medium",
        question: "A 1.46 MeV gamma ray from ⁴⁰K enters a concrete wall. Which interaction mechanism is most likely to dominate?",
        options: [
            "Photoelectric absorption – because ⁴⁰K has high atomic number",
            "Compton scattering – because at 1.46 MeV in low-Z material, Compton dominates",
            "Pair production – because the energy exceeds 1.022 MeV",
            "Rayleigh scattering – because the photon energy matches the electron binding energy"
        ],
        correct: 1,
        explanation: "At 1.46 MeV in concrete (low-Z, dominated by oxygen and silicon), Compton scattering is the dominant interaction. Photoelectric absorption dominates at low energies (<100 keV) in high-Z materials. Pair production becomes significant above 1.022 MeV but requires much higher energies to dominate in low-Z materials. Your dissertation confirmed this — you validated mass attenuation coefficients showing Compton dominates at this energy range.",
        dissertation_link: "You actually investigated this in your dissertation! Your Table 5.1 showed simulated mass attenuation coefficients agreed with XCOM values, confirming Compton scattering dominates at 1.46 MeV."
    },
    {
        id: 2, category: "radiation-physics", panelist: "rachel", difficulty: "medium",
        question: "During a fluoroscopy QA test you measure patient entrance surface dose (ESD). The radiographer reports the image looks 'noisy'. What is the likely cause and how does this relate to radiation physics?",
        options: [
            "Increased kVp causing more Compton scatter and reducing image contrast",
            "Too low mAs leading to insufficient photon fluence — quantum mottle (statistical noise)",
            "Excess filtration removing high-energy photons that carry diagnostic information",
            "Grid cutoff artefact caused by incorrect grid ratio for the SID used"
        ],
        correct: 1,
        explanation: "Quantum mottle (noise) arises from insufficient X-ray photon fluence reaching the detector. When mAs is too low, the statistical variation in photon numbers becomes visible as noise. This is a direct consequence of the Poisson distribution governing photon detection — SNR improves with the square root of photon count. Increasing mAs improves SNR but increases patient dose — classic ALARP trade-off.",
        dissertation_link: null
    },
    {
        id: 3, category: "radiation-physics", panelist: "connor", difficulty: "hard",
        question: "In your attenuation equation I = I₀e^(-μx), what happens to the mass attenuation coefficient (μ/ρ) for concrete as photon energy increases from 0.24 MeV (²¹²Pb) to 1.46 MeV (⁴⁰K)?",
        options: [
            "It increases because higher energy photons interact more with the material",
            "It stays constant — the mass attenuation coefficient is energy-independent",
            "It decreases because Compton scattering is less efficient at removing photons than photoelectric absorption",
            "It increases then decreases, peaking at the K-edge of calcium"
        ],
        correct: 2,
        explanation: "Mass attenuation coefficient decreases with increasing energy (for energies dominated by Compton scattering). Your dissertation Table 5.1 demonstrated this exactly: μ/ρ for 0.24 MeV (²¹²Pb) was ~0.094 cm²/g vs 0.043 cm²/g for 1.46 MeV (⁴⁰K). Lower energies are more efficiently attenuated, which is why thin walls attenuate low-energy gammas but high-energy gammas penetrate further.",
        dissertation_link: "Your Table 5.1 and Figure 5.2 directly demonstrate this — and the self-absorption saturation effect you found in your thickness simulations elegantly proves this physics."
    },
    {
        id: 4, category: "radiation-physics", panelist: "craig", difficulty: "easy",
        question: "What is the minimum photon energy required for pair production to occur?",
        options: ["0.511 MeV", "1.022 MeV", "1.46 MeV", "2.044 MeV"],
        correct: 1,
        explanation: "Pair production requires a minimum of 1.022 MeV because this is the combined rest-mass energy of the positron-electron pair created (2 × 0.511 MeV). Any energy above this threshold is converted to kinetic energy of the pair. This threshold is why ⁴⁰K (1.46 MeV) can technically produce pairs, but Compton still dominates in low-Z materials at this energy.",
        dissertation_link: null
    },
    {
        id: 5, category: "radiation-physics", panelist: "rachel", difficulty: "medium",
        question: "What distinguishes deterministic effects from stochastic effects of ionising radiation?",
        options: [
            "Deterministic effects have no threshold; stochastic effects occur above a threshold dose",
            "Deterministic effects have a threshold and increase in severity with dose; stochastic effects have no threshold but increase in probability",
            "Deterministic effects only affect DNA; stochastic effects cause tissue damage",
            "Deterministic effects are reversible; stochastic effects always cause cancer"
        ],
        correct: 1,
        explanation: "Deterministic effects (e.g., erythema, cataracts, radiation sickness) have a dose threshold below which they don't occur — above it, severity increases with dose. Individual thresholds vary. Stochastic effects (cancer, hereditary effects) have no established threshold — under the LNT model, any dose carries some risk — but severity doesn't depend on dose, only probability increases. This underpins the ALARP principle in radiation protection.",
        dissertation_link: "Your dissertation Section 2.3.1 covers this beautifully. You noted deterministic effects range from 0.5–1 Gy (manageable) to 100% mortality at 10 Gy+. A great way to demonstrate your theoretical grounding."
    },
    {
        id: 6, category: "radiation-physics", panelist: "connor", difficulty: "hard",
        question: "A scattered X-ray photon emerges at 90° from a diagnostic X-ray beam. If the incident photon was 100 keV, what is the energy of the scattered photon (m₀c² = 511 keV)?",
        options: ["83.6 keV", "100 keV", "50 keV", "511 keV"],
        correct: 0,
        explanation: "Using the Compton formula: E' = E / (1 + E/m₀c² × (1-cosθ)) = 100 / (1 + 100/511 × (1-cos90°)) = 100 / (1 + 0.1957 × 1) = 100/1.1957 ≈ 83.6 keV. The scattered photon loses energy, and this energy difference goes to the recoil electron. At 180° (backscatter), the minimum energy photon and maximum recoil electron energy occurs.",
        dissertation_link: null
    },

    // X-RAY EQUIPMENT & QA
    {
        id: 7, category: "xray-qa", panelist: "craig", difficulty: "medium",
        question: "You arrive at a hospital to perform routine QA on a CR (computed radiography) system. What is the FIRST check you should perform before any measurements?",
        options: [
            "MTF (modulation transfer function) measurement with bar pattern",
            "Visual inspection, safety checks, and review of the equipment logbook/previous reports",
            "Exposure index verification against vendor specifications",
            "Calibration of your ionisation chamber against a known standard"
        ],
        correct: 1,
        explanation: "Before any QA testing, you must conduct a visual inspection for obvious defects, check safety interlocks, review the equipment logbook for recent issues or previous QA results, and verify the room is safe to enter. This is part of working within an ISO 9001 quality system and following your SOPs. Never begin measurements without understanding the equipment's recent history — faults may affect your results or create hazards.",
        dissertation_link: null
    },
    {
        id: 8, category: "xray-qa", panelist: "rachel", difficulty: "medium",
        question: "During a DR (digital radiography) detector QA test, you notice uniformity is poor in the bottom-left quadrant of the detector. What are the two most likely causes?",
        options: [
            "Anti-scatter grid misalignment and incorrect SID used during testing",
            "Detector pixel failure/dead pixels cluster OR flat-field correction calibration out of date",
            "Excessive mAs causing detector saturation in that region",
            "Beam collimation restricting exposure to the bottom-left quadrant only"
        ],
        correct: 1,
        explanation: "Non-uniform response in a specific detector region typically indicates either (1) a cluster of failed/malfunctioning pixels that the flat-field correction cannot compensate, or (2) an outdated flat-field (dark/gain) calibration causing incorrect correction in that region. You should recommend recalibrating the detector's flat-field correction first; if non-uniformity persists, escalate to the engineer as a hardware fault requiring investigation.",
        dissertation_link: null
    },
    {
        id: 9, category: "xray-qa", panelist: "connor", difficulty: "easy",
        question: "What does 'critical examination' mean in the context of commissioning new X-ray equipment?",
        options: [
            "A final safety test performed after the equipment has been in clinical use for 3 months",
            "An examination of the installation before first clinical use to verify safety — required under IRR17",
            "A manufacturer's factory acceptance test done before delivery",
            "A peer review of QA reports by a senior physicist"
        ],
        correct: 1,
        explanation: "Under Regulation 31 of IRR17 (Ionising Radiations Regulations 2017), a critical examination must be carried out by a competent person (typically an MPE/RPA) before new or modified radiation equipment is first brought into clinical use. It verifies that radiation protection features are working correctly, the installation meets design specifications, and the equipment is safe. This is a core part of your role described in the job description.",
        dissertation_link: null
    },
    {
        id: 10, category: "xray-qa", panelist: "rachel", difficulty: "hard",
        question: "You are performing dental X-ray equipment QA. What is the significance of the 'FWHM' of the beam quality (HVL measurement) for a dental unit?",
        options: [
            "FWHM measures the geometric penumbra at the edge of the dental X-ray field",
            "HVL (half-value layer) characterises beam quality; for dental units, IRR17 specifies minimum HVL values to ensure adequate filtration is present for patient dose optimisation",
            "FWHM of the HVL measurement quantifies the statistical uncertainty of your ionisation chamber reading",
            "HVL for dental equipment must exactly match mammography beam specifications under CQC regulations"
        ],
        correct: 1,
        explanation: "HVL (half-value layer) quantifies beam quality — the thickness of material (usually aluminium) that halves beam intensity. For dental equipment, IRR17/IPEM guidance specifies minimum HVL values (typically 1.5 mm Al for dental at 60-70 kVp) to ensure adequate inherent and added filtration, removing low-energy photons that would only contribute dose without diagnostic benefit. Low HVL = poorly filtered beam = excessive patient dose.",
        dissertation_link: null
    },
    {
        id: 11, category: "xray-qa", panelist: "craig", difficulty: "medium",
        question: "A mobile X-ray unit is failing its automatic exposure control (AEC) reproducibility test. Coefficient of variation of repeated exposures is 8%. What is the acceptable threshold and what might cause this failure?",
        options: [
            "CV >5% is acceptable; no further action needed",
            "CV should typically be ≤5%; causes include worn AEC detector, software fault, or failing X-ray tube ageing",
            "CV >10% triggers immediate equipment withdrawal; CV 8% is a minor advisory",
            "AEC is not required for mobile units so reproducibility testing doesn't apply"
        ],
        correct: 1,
        explanation: "Typical QA acceptance criteria for AEC reproducibility is ≤5% CV (some protocols accept ±10%). At 8%, this exceeds tolerance and requires investigation. Likely causes: ageing/failing AEC ionisation chambers, software calibration drift, X-ray tube output variability (ageing filament/anode), or generator instability. You should report this to the RPA/MPE, recommend engineering investigation, and consider whether the equipment should continue clinical use pending repair.",
        dissertation_link: null
    },

    // RADIATION PROTECTION & REGULATIONS
    {
        id: 12, category: "radiation-protection", panelist: "rachel", difficulty: "medium",
        question: "A radiographer asks you about the ALARP principle. How would you explain it?",
        options: [
            "As Low As Reasonably Possible — doses must be reduced to zero where technology permits",
            "As Low As Reasonably Practicable — doses must be reduced as far as reasonably achievable, balancing benefit against the cost/effort of further reduction",
            "A Level Above Recommended Protocol — meaning doses should not exceed DRLs under any circumstances",
            "As Low As Radiologically Permitted — based on the dose limit set by the RPA for that installation"
        ],
        correct: 1,
        explanation: "ALARP (As Low As Reasonably Practicable) means doses should be reduced as far as reasonably achievable, taking into account economic and social factors. It's not about zero dose — it's about a cost-benefit analysis where further dose reduction is pursued unless the effort/cost is grossly disproportionate to the benefit. This principle underpins UK radiation protection legislation (IRR17) and the optimisation principle of the ICRP's system of radiological protection.",
        dissertation_link: "Your dissertation discusses this — your research on indoor natural background radiation exposure directly contributes to understanding when protective measures are justified vs. grossly disproportionate."
    },
    {
        id: 13, category: "radiation-protection", panelist: "connor", difficulty: "hard",
        question: "Under IRR17, what is the dose limit for classified radiation workers (effective dose)?",
        options: [
            "1 mSv/year averaged over 5 years",
            "6 mSv/year for the lens of the eye",
            "20 mSv/year averaged over 5 years, with no single year exceeding 50 mSv",
            "50 mSv/year with a lifetime limit of 400 mSv"
        ],
        correct: 2,
        explanation: "Under IRR17 (Schedule 3), the effective dose limit for classified radiation workers is 20 mSv/year averaged over 5 consecutive calendar years, with no single year exceeding 50 mSv. Separate equivalent dose limits apply: 150 mSv/year for the lens of the eye (post-2018 ICRP104 update reduced this from 150 to 20 mSv/year for lens), 500 mSv/year for skin and extremities. Members of the public are limited to 1 mSv/year effective dose.",
        dissertation_link: null
    },
    {
        id: 14, category: "radiation-protection", panelist: "craig", difficulty: "medium",
        question: "What is the difference between an RPA (Radiation Protection Adviser) and an RPS (Radiation Protection Supervisor)?",
        options: [
            "An RPA is employed by the HSE; an RPS is employed by the hospital — they have the same legal powers",
            "An RPA is an external expert who advises the employer on compliance with IRR17; an RPS is appointed within the workforce to supervise day-to-day working practices in a controlled/supervised area",
            "An RPA performs all QA measurements; an RPS reviews and signs off reports",
            "An RPA is only required for nuclear medicine; an RPS is required for all X-ray departments"
        ],
        correct: 1,
        explanation: "Under IRR17: An RPA (Radiation Protection Adviser) is an external expert (typically accredited by RCR/IPEM) who provides specialist advice to the employer on statutory compliance — they're not usually an employee. An RPS (Radiation Protection Supervisor) is appointed by the employer from within their workforce to supervise that radiological work is carried out safely in accordance with the local rules. As a clinical technologist at Christie, you'd work closely with both. Your team essentially provides the RPA function for customer hospitals.",
        dissertation_link: null
    },
    {
        id: 15, category: "radiation-protection", panelist: "rachel", difficulty: "easy",
        question: "A patient is undergoing a fluoroscopic procedure. What does IR(ME)R 2017 require before the exposure commences?",
        options: [
            "The radiographer must record the exposure factors in the patient notes",
            "The exposure must be justified by a practitioner — the individual benefit must outweigh the risk to the patient",
            "An ALARP statement must be signed by the referring clinician",
            "The MPE must approve all fluoroscopic exposures over 5 minutes"
        ],
        correct: 1,
        explanation: "IR(ME)R 2017 (Ionising Radiation (Medical Exposure) Regulations) requires that every medical exposure is clinically justified by a practitioner (a registered healthcare professional with IR(ME)R training). Justification means the individual benefit of the exposure must outweigh the potential harm. The practitioner takes clinical responsibility for the exposure. This is separate from IRR17 which covers worker/public protection. Remember: IR(ME)R = patient protection; IRR17 = worker/public protection.",
        dissertation_link: null
    },
    {
        id: 16, category: "radiation-protection", panelist: "connor", difficulty: "hard",
        question: "You receive a DRL (Diagnostic Reference Level) alert showing a hospital's mean patient dose for chest PA is 0.25 mGy vs. the national DRL of 0.1 mGy. What is your recommended course of action?",
        options: [
            "Immediately withdraw the equipment from clinical use until the dose is reduced",
            "Investigate the cause (technique factors, patient factors, equipment calibration) and recommend optimisation measures; escalate to RPA if doses cannot be explained",
            "Inform the CQC directly as this constitutes a significant unintended exposure",
            "Increase the local DRL to match the hospital's measured dose"
        ],
        correct: 1,
        explanation: "Exceeding a DRL is a trigger to investigate and optimize, not an immediate shutdown. DRLs are not dose limits — they're reference levels indicating when practice should be reviewed. Investigation should include: checking technique factors (kVp, mAs, AEC settings), patient size distribution, detector calibration, and comparing with similar hospitals. Produce a report with recommendations for optimisation. Escalate to the RPA/MPE if doses remain unexplained after investigation. The CQC is only notified for significant unintended/accidental exposures (IR(ME)R Reg 5).",
        dissertation_link: null
    },
    {
        id: 17, category: "radiation-protection", panelist: "craig", difficulty: "medium",
        question: "What is the EU/UK reference level for indoor radon concentration that buildings should not exceed?",
        options: ["100 Bq/m³", "200 Bq/m³", "300 Bq/m³", "600 Bq/m³"],
        correct: 2,
        explanation: "The current EU reference level (Euratom BSS, implemented in UK via IRR17) is 300 Bq/m³ for indoor radon. The ICRP also recommends 300 Bq/m³ (reduced from the earlier 600 Bq/m³). Radon is the second leading cause of lung cancer after smoking (WHO). Your dissertation covered this extensively — after smoking, radon inhalation poses the highest lung cancer risk, increasing by ~16% per 100 Bq/m³ increase.",
        dissertation_link: "You cited the EU reference level of 300 Bq/m³ in your dissertation. You could tell the panel how your Monte Carlo simulation work quantified indoor gamma doses — complementing radon measurements in building radiation risk assessment."
    },

    // SITUATIONAL & COMPETENCY
    {
        id: 18, category: "situational", panelist: "rachel", difficulty: "medium",
        question: "Rachel asks: 'Tell me about a time you had to adapt quickly when something didn't go to plan during a technical procedure or investigation.'",
        options: [
            "Talk about a time you followed protocol exactly, even when it was difficult",
            "Describe using STAR format: a situation where equipment failed or results were unexpected, your specific action to troubleshoot, and the positive outcome",
            "Explain that you always plan meticulously so problems rarely arise",
            "Describe how you escalated immediately to a supervisor without attempting any troubleshooting"
        ],
        correct: 1,
        explanation: "Use STAR (Situation, Task, Action, Result). Suggested answer drawing on your experience: 'During my time at Korle-Bu Teaching Hospital, a CT scanner developed artefacts mid-session in A&E. I performed systematic checks — reviewed scout images, checked gantry communication logs, identified a detector calibration drift. I immediately stopped the session, performed an emergency air calibration, verified results with a phantom scan, and the unit was back in service within 40 minutes. Patients were rescheduled safely and I documented the fault fully for the engineering team.' This shows problem-solving, patient focus, and systematic thinking.",
        dissertation_link: "You could also draw on your dissertation: 'During my Monte Carlo simulations, TOPAS returned unexpected dose saturation results at 12cm wall thickness. Rather than assuming error, I investigated — identifying self-absorption as the physical cause. This systematic troubleshooting mindset is what I bring to equipment QA.'"
    },
    {
        id: 19, category: "situational", panelist: "craig", difficulty: "medium",
        question: "Craig asks: 'This role involves regular travel to hospitals across the North West. How do you feel about that, and can you give an example of working effectively in unfamiliar environments?'",
        options: [
            "Say you prefer working from a fixed base but can travel occasionally if required",
            "Express enthusiasm for the variety, highlight experience working across multiple hospitals in Ghana (Madina Pentecost, Korle-Bu, Ridge Hospital), and discuss self-sufficiency and adaptability",
            "Mention that you'd need a detailed induction for each new hospital before working independently",
            "Focus on your ability to follow SOPs regardless of location"
        ],
        correct: 1,
        explanation: "The Christie DRRPS role explicitly requires frequent travel (3x/week). This is a key requirement. Strong answer: 'I actually thrive in varied environments. During my clinical career in Ghana, I rotated across three different hospital settings — Korle-Bu Teaching Hospital, Madina Pentecost, and Ridge Hospital — each with different equipment, protocols and team cultures. I learned to quickly assess a new environment, establish safe working practices, and build rapport with local teams. I'd relish the opportunity to support hospitals across the North West and bring consistency of expert physics QA to each site.'",
        dissertation_link: null
    },
    {
        id: 20, category: "situational", panelist: "connor", difficulty: "medium",
        question: "Connor asks: 'How would you explain a complex radiation physics concept — like beam quality — to a radiographer who has no physics background?'",
        options: [
            "Tell them to read the relevant IPEM reports",
            "Use an analogy: relate HVL/beam quality to something tangible — like sunscreen SPF or filtering coffee — and connect it directly to why it matters for their patients",
            "Explain the full mathematical derivation of the attenuation equation",
            "Say it's not the radiographer's responsibility to understand physics — only the physicist needs to know"
        ],
        correct: 1,
        explanation: "The job spec lists 'ability to clearly communicate findings/recommendations' and includes teaching/outreach commitments. Great answer: 'I'd use an analogy. I might say: \"Think of beam quality like a coffee filter — a fine filter removes more impurities but takes longer. A well-filtered X-ray beam removes the weak, low-energy photons that would dose your patient without adding any diagnostic information. Half-value layer is just our way of measuring how well the filter is working. A higher HVL means a better-filtered, cleaner beam.\" Then I'd connect it to why we check it regularly — patient dose optimisation.' Show enthusiasm for teaching.",
        dissertation_link: "Your dissertation is evidence you can communicate complex physics — you explained TOPAS simulations, secular equilibrium, and gamma interactions clearly. Mention this!"
    },
    {
        id: 21, category: "situational", panelist: "rachel", difficulty: "hard",
        question: "Rachel asks: 'You're testing equipment at a busy radiology department and the radiographers are clearly frustrated that you're taking the scanner offline. How do you handle this?'",
        options: [
            "Rush through the QA tests as quickly as possible to minimise disruption",
            "Acknowledge their frustration, explain why safe QA protects their patients and their registration, offer flexibility on timing if possible, and work efficiently within agreed constraints",
            "Escalate to your manager immediately to get authority to continue",
            "Stop the QA and return another day to avoid conflict"
        ],
        correct: 1,
        explanation: "This tests your Christie values (Act with Kindness, Connect with People) and professionalism. Model answer: 'I'd acknowledge directly: \"I completely understand this is disruptive and I want to get you back up as quickly as possible. This QA ensures the equipment is safe and meeting its performance spec — ultimately protecting your patients and supporting your clinical decisions.\" I'd then work efficiently and communicate a realistic completion time. If there's flexibility in timing, I'd discuss this before the visit. Building relationships with the radiology teams is part of the job — they'll be more cooperative if they see us as collaborative partners, not bureaucratic hurdles.'",
        dissertation_link: null
    },
    {
        id: 22, category: "situational", panelist: "craig", difficulty: "easy",
        question: "Craig asks about Christie's values. The Trust has three core values: Make a Difference, Act with Kindness, Connect with People. How do you see these applying to a clinical physics technologist role?",
        options: [
            "These values are mainly relevant to patient-facing clinical staff, not physics technologists",
            "Make a Difference: ensuring safe, accurate equipment directly enables better patient diagnosis. Act with Kindness: approaching radiographers, engineers and patients with respect and empathy. Connect with People: building trust with hospital teams you visit regularly across the NW.",
            "You'd demonstrate the values through compliance with Trust HR policies",
            "The values are aspirational but secondary to technical competence in this role"
        ],
        correct: 1,
        explanation: "The Christie's values aren't just for patient-facing staff — they shape how everyone works. For your role: Make a Difference = every QA test you do directly impacts whether a radiographer has reliable equipment, affecting patient safety and diagnostic quality across the whole NW region. Act with Kindness = treating hospital staff with respect during visits, especially when delivering difficult news about failing equipment. Connect with People = building long-term relationships with radiography departments and engineering teams so they see your team as trusted partners, not external inspectors.",
        dissertation_link: null
    },
    {
        id: 23, category: "situational", panelist: "connor", difficulty: "medium",
        question: "Connor asks: 'Why Christie? Why this specific role in diagnostic radiology physics rather than radiotherapy or nuclear medicine?'",
        options: [
            "Say it's the only medical physics job you could find in the North West",
            "Highlight the breadth of diagnostic modalities, the regional service scope, your BSc in diagnostic radiography providing direct foundation, and Christie's reputation for excellence",
            "Say diagnostic radiology pays better than the alternatives",
            "Say you're interested in all physics disciplines equally"
        ],
        correct: 1,
        explanation: "Strong answer: 'My foundation is diagnostic radiography — I spent years ensuring diagnostic equipment produced the highest quality images for patient care. Moving into the physics side feels like a natural evolution: I want to work at the level where I'm ensuring the infrastructure that every radiographer relies on is safe and optimal. Christie's DRRPS is exceptional — a regional service supporting hospitals across the entire North West, operating within an ISO 9001 quality system with genuine MPE/RPA oversight. The breadth of modalities, from dental to fluoroscopy, combined with the opportunity to contribute to a world-renowned cancer centre's physics team — there's nowhere else I'd rather build this career.'",
        dissertation_link: null
    },

    // DISSERTATION SPOTLIGHT
    {
        id: 24, category: "dissertation", panelist: "rachel", difficulty: "medium",
        question: "Your MSc dissertation used TOPAS (GEANT4) Monte Carlo simulations. How is Monte Carlo simulation relevant to clinical medical physics?",
        options: [
            "Monte Carlo is primarily used for financial modelling and has limited clinical physics applications",
            "Monte Carlo simulates radiation transport through matter probabilistically — used in radiotherapy treatment planning, radiation shielding design, detector calibration, and dosimetry validation",
            "Monte Carlo is only used for nuclear medicine dosimetry, not diagnostic radiology",
            "Monte Carlo models are too computationally expensive for any clinical application"
        ],
        correct: 1,
        explanation: "Monte Carlo simulation is foundational in medical physics. In your diagnostic radiology context: it's used to design and validate radiation shielding in X-ray rooms (ensuring staff/public dose limits are met), model scatter radiation from fluoroscopy suites, validate dosimetry measurements, and generate DRLs. Your dissertation specifically investigated building radiation attenuation — directly translatable to radiation protection survey work for X-ray installation shielding assessment, which is part of the Christie role.",
        dissertation_link: "Your TOPAS code validated concrete attenuation coefficients against XCOM standards — this is exactly the kind of rigorous, physics-based methodology that underpins radiation protection survey work. Mention this connection explicitly!"
    },
    {
        id: 25, category: "dissertation", panelist: "craig", difficulty: "hard",
        question: "In your research, you found that ⁴⁰K contributed the highest indoor gamma dose, followed by ²³²Th series, then ²³⁸U series. How might this finding be relevant to radiation protection in diagnostic X-ray installations?",
        options: [
            "It has no relevance — diagnostic X-rays produce much higher doses than natural background",
            "It provides baseline natural background dose data for correctly interpreting radiation survey measurements — you need to account for natural background when measuring scattered X-ray doses",
            "It suggests hospitals should use potassium-free concrete in X-ray room walls",
            "It means ²³⁸U must be screened for in all building materials used in radiology departments"
        ],
        correct: 1,
        explanation: "When conducting radiation protection surveys in X-ray installations, you measure the total dose rate — which includes both scattered X-ray radiation AND natural background gamma radiation. Understanding natural background contribution is essential for correctly attributing measured doses. Your finding that ⁴⁰K contributes most indoor gamma dose (~1.32×10⁻¹² Gy in your model room) provides a quantitative framework for separating background from X-ray-generated scatter. It also informs shielding design: if background is significant relative to scatter, over-engineering shielding may be unnecessary (ALARP).",
        dissertation_link: "This is a sophisticated connection the panel may not expect — use it to demonstrate you've genuinely thought about how your research translates to practice."
    },
    {
        id: 26, category: "dissertation", panelist: "connor", difficulty: "medium",
        question: "Your dissertation showed that dose was significantly higher near walls than at the room centre. What practical radiation protection lesson does this illustrate?",
        options: [
            "Hospital patients should always be positioned at the centre of X-ray rooms",
            "Position matters enormously in radiation protection — proximity to radiation sources dramatically increases dose, which is why distance is a fundamental shielding principle",
            "Hospitals should remove interior walls from X-ray rooms to reduce scatter",
            "Radiation workers should always stand against walls during fluoroscopy procedures"
        ],
        correct: 1,
        explanation: "Your simulation showed near-wall doses were approximately twice those at the room centre for small walls, and significantly higher for all geometries. This directly illustrates the inverse square law principle: dose rate decreases with the square of distance from the source. In radiation protection surveys, this means: (1) measuring dose at appropriate distances from the primary beam, (2) ensuring operator workstations are optimally positioned, (3) recognising that walls adjacent to X-ray rooms receive significantly higher scatter doses than distant rooms. Distance is the cheapest form of radiation protection.",
        dissertation_link: "Your Figure 5.5 near-wall simulation data is compelling evidence. You showed quantitatively what textbooks state qualitatively."
    },
    {
        id: 27, category: "dissertation", panelist: "rachel", difficulty: "easy",
        question: "You validated your TOPAS simulation by comparing to XCOM database values for mass attenuation coefficients. Why is validation of simulation models important in medical physics?",
        options: [
            "Validation is a regulatory requirement but has no practical impact on results",
            "Validated models give confidence that simulation outputs accurately reflect physical reality — essential before using models to make clinical decisions about patient safety or shielding adequacy",
            "Validation ensures the simulation software is correctly licensed for clinical use",
            "XCOM comparison is only needed for publications, not for clinical use of models"
        ],
        correct: 1,
        explanation: "Validation is fundamental to the ISO 9001 quality system and good scientific practice. In medical physics, models influence real decisions: shielding thickness for X-ray rooms, dose estimates for patients, equipment performance acceptance criteria. If a model is unvalidated, any errors propagate directly to clinical decisions. Your dissertation validated against XCOM (a NIST-maintained standard) — demonstrating intellectual rigour. This mirrors how Christie's physics service validates measurement equipment through calibration against national standards. Both reflect the same principle: verification against known standards before clinical application.",
        dissertation_link: "This validation mindset — checking your results against established references before drawing conclusions — is exactly what's required in ISO 9001 quality system working. Highlight this cultural alignment."
    },
    {
        id: 28, category: "dissertation", panelist: "craig", difficulty: "medium",
        question: "Your dissertation investigated how room size affected indoor radiation dose. Smaller rooms had higher doses. How might this inform radiation protection advice to a hospital planning a new fluoroscopy suite?",
        options: [
            "Recommend the smallest possible room to concentrate radiation for easier measurement",
            "Larger rooms mean greater distance between source and boundaries — recommending adequate room dimensions is part of radiation protection design, reducing wall scatter dose rates",
            "Room size has no impact on shielding requirements; only wall thickness matters",
            "Your finding only applies to natural background radiation, not scattered X-rays"
        ],
        correct: 1,
        explanation: "Your dissertation quantified that total dose in a small room (4×2.5×3m) was 3.54×10⁻¹¹ Gy vs 2.09×10⁻¹¹ Gy in a large room (8×2.8×4m) — a 70% higher dose in the smaller space. Directly translatable: when advising on fluoroscopy suite design, larger rooms allow greater distance between the X-ray source and adjacent areas, reducing scatter dose to walls/floors/ceilings and therefore the shielding requirement. Adequate room size is a cost-effective radiation protection measure — potentially reducing the thickness of expensive lead shielding. This is exactly the kind of physics-informed advice the Christie team provides to new hospital builds.",
        dissertation_link: "Table 5.2 from your dissertation — comparing all three house sizes — is a compelling visual that illustrates this principle. You have real simulation data to support this advice."
    },
];
