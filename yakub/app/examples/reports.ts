import { Report, Symptom, Drug } from '../types';

const exampleReports: Report[] = [
  {
    full_text: "Patient complains of severe headache and nausea for the past 3 days. Pain is concentrated in the frontal region and worsens with movement.",
    summary: "3-day severe frontal headache with nausea, exacerbated by movement.",
    patient_symptoms: [
      { name: "headache", intensity: 5, is_gone: false },
      { name: "nausea", intensity: 3, is_gone: false }
    ],
    emotion_analysis: "Patient appears distressed and fatigued.",
    predicted_disease: "Migraine",
    real_symptoms: [
      { name: "headache", intensity: 5, is_gone: false },
      { name: "nausea", intensity: 3, is_gone: false },
      { name: "photophobia", intensity: 4, is_gone: false }
    ],
    real_disease: "Migraine",
    treament: [
      { name: "Sumatriptan", frequency: "1", time: "as needed", quantity: 50 },
      { name: "Ondansetron", frequency: "3", time: "3", quantity: 4 }
    ]
  },
  {
    full_text: "Patient reports persistent dry cough and mild fever for a week. No shortness of breath or chest pain.",
    summary: "1-week persistent dry cough with mild fever, no respiratory distress.",
    patient_symptoms: [
      { name: "cough", intensity: 4, is_gone: false },
      { name: "fever", intensity: 2, is_gone: false }
    ],
    emotion_analysis: "Patient seems mildly concerned but generally calm.",
    predicted_disease: "Upper Respiratory Infection",
    real_symptoms: [
      { name: "cough", intensity: 4, is_gone: false },
      { name: "fever", intensity: 2, is_gone: false },
      { name: "fatigue", intensity: 3, is_gone: false }
    ],
    real_disease: "Viral Bronchitis",
    treament: [
      { name: "Dextromethorphan", frequency: "4", time: "5", quantity: 30 },
      { name: "Acetaminophen", frequency: "4", time: "5", quantity: 500 }
    ]
  },
  {
    full_text: "Patient experiencing sharp abdominal pain in lower right quadrant, loss of appetite, and nausea for 24 hours.",
    summary: "24-hour sharp lower right abdominal pain with nausea and appetite loss.",
    patient_symptoms: [
      { name: "abdominal pain", intensity: 5, is_gone: false },
      { name: "nausea", intensity: 3, is_gone: false },
      { name: "loss of appetite", intensity: 4, is_gone: false }
    ],
    emotion_analysis: "Patient appears anxious and in significant discomfort.",
    predicted_disease: "Appendicitis",
    real_symptoms: [
      { name: "abdominal pain", intensity: 5, is_gone: false },
      { name: "nausea", intensity: 3, is_gone: false },
      { name: "fever", intensity: 2, is_gone: false },
      { name: "rebound tenderness", intensity: 4, is_gone: false }
    ],
    real_disease: "Acute Appendicitis",
    treament: [
      { name: "Laparoscopic Appendectomy", frequency: "1", time: "1", quantity: 1 },
      { name: "Ceftriaxone", frequency: "2", time: "3", quantity: 1000 }
    ]
  },
  {
    full_text: "Patient reports itchy, red rash on arms and torso after hiking in wooded area. No fever or systemic symptoms.",
    summary: "Itchy, red rash on arms and torso following woodland hike, no systemic symptoms.",
    patient_symptoms: [
      { name: "rash", intensity: 3, is_gone: false },
      { name: "itching", intensity: 4, is_gone: false }
    ],
    emotion_analysis: "Patient seems mildly uncomfortable but not overly concerned.",
    predicted_disease: "Contact Dermatitis",
    real_symptoms: [
      { name: "rash", intensity: 3, is_gone: false },
      { name: "itching", intensity: 4, is_gone: false },
      { name: "linear distribution", intensity: 2, is_gone: false }
    ],
    real_disease: "Poison Ivy Dermatitis",
    treament: [
      { name: "Triamcinolone cream", frequency: "2", time: "7", quantity: 1 },
      { name: "Diphenhydramine", frequency: "4", time: "5", quantity: 25 }
    ]
  },
  {
    full_text: "Patient presents with sudden onset of chest pain, shortness of breath, and palpitations. Pain is described as crushing and radiating to the left arm.",
    summary: "Sudden chest pain radiating to left arm, with shortness of breath and palpitations.",
    patient_symptoms: [
      { name: "chest pain", intensity: 5, is_gone: false },
      { name: "shortness of breath", intensity: 4, is_gone: false },
      { name: "palpitations", intensity: 3, is_gone: false }
    ],
    emotion_analysis: "Patient appears extremely anxious and in severe distress.",
    predicted_disease: "Myocardial Infarction",
    real_symptoms: [
      { name: "chest pain", intensity: 5, is_gone: false },
      { name: "shortness of breath", intensity: 4, is_gone: false },
      { name: "palpitations", intensity: 3, is_gone: false },
      { name: "diaphoresis", intensity: 3, is_gone: false },
      { name: "nausea", intensity: 2, is_gone: false }
    ],
    real_disease: "Acute Myocardial Infarction",
    treament: [
      { name: "Aspirin", frequency: "1", time: "1", quantity: 325 },
      { name: "Nitroglycerin", frequency: "1", time: "as needed", quantity: 0.4 },
      { name: "Morphine", frequency: "1", time: "as needed", quantity: 4 },
      { name: "Percutaneous Coronary Intervention", frequency: "1", time: "1", quantity: 1 }
    ]
  }
];

export default exampleReports;
