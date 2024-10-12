type Symptom = {
  name: string; // name of the symptom
  intensity: number; // intensity of the symptom (1 to 5)
  is_gone: boolean; // if the symptom is gone at the moment the patient make the report
};

type Drug = {
  name: string; // name of the drug
  frequency: string; // frequency per day
  time: string; // number of days
  quantity: number; // quantity at each time taken
};

type Report = {
  full_text: string; // full text from STT
  summary: string; // summary by LLM
  patient_symptoms: Array<Symptom>; // symptoms from the patient by LLM
  emotion_analysis: string; // emotions from the audio
  predicted_disease: string; // disease predicted from fine tuned model
  real_symptoms: Array<Symptom>; // real symptoms gotten from medical consultation audio
  real_disease: string; // real disease gotten from medical consultation audio
  treament: Array<Drug>; // treatment given to the patient
};

type Patient = {
  first_name: string;
  last_name: string;
  age: number;
  sexe: string;
  address: string;
  reports: Array<Report>;
};

type Doctor = {
  first_name: string;
  last_name: string;
  age: number;
  sexe: string;
  address: string;
  type: string; // general, ORL, heart disease ...
  hopital: string | null;
};

type Hopital = {
  name: string;
  address: string;
  doctor_types: Array<string>;
};

export type { Symptom, Drug, Report, Patient, Doctor, Hopital };
