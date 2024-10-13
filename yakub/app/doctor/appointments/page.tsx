"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";

type Appointment = {
  id: string;
  time: string;
  patientName: string;
  reason: string;
};

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  height: string;
  weight: string;
  allergies: string[];
  medications: string[];
  medicalHistory: string;
  symptoms: string;
};

type PatientSymptom = {
  name: string;
  is_gone: boolean;
};

type Report = {
  summary: string;
  patient_symptoms: PatientSymptom[];
  predicted_disease: string;
  full_text: string;
};

const mockAppointments: Appointment[] = [
  { id: "1", time: "09:00 AM", patientName: "John Doe", reason: "Annual checkup" },
  { id: "2", time: "09:30 AM", patientName: "Jane Smith", reason: "Flu symptoms" },
  { id: "3", time: "10:00 AM", patientName: "Bob Johnson", reason: "Follow-up appointment" },
  { id: "4", time: "10:30 AM", patientName: "Alice Brown", reason: "Vaccination" },
  { id: "5", time: "11:00 AM", patientName: "Charlie Davis", reason: "Skin rash consultation" },
  { id: "6", time: "11:30 AM", patientName: "Eva Wilson", reason: "Prenatal checkup" },
  { id: "7", time: "01:00 PM", patientName: "Frank Miller", reason: "Blood pressure monitoring" },
  { id: "8", time: "01:30 PM", patientName: "Grace Taylor", reason: "Allergy test results" },
  { id: "9", time: "02:00 PM", patientName: "Henry Clark", reason: "Chronic pain management" },
  { id: "10", time: "02:30 PM", patientName: "Ivy Martinez", reason: "Diabetes consultation" },
  { id: "11", time: "03:00 PM", patientName: "Jack Anderson", reason: "Eye examination" },
  { id: "12", time: "03:30 PM", patientName: "Karen White", reason: "Mental health checkup" },
];

const mockPatients: { [key: string]: Patient & { report: Report } } = {
  "1": {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "Male",
    bloodType: "A+",
    height: "180 cm",
    weight: "75 kg",
    allergies: ["Penicillin"],
    medications: ["Lisinopril", "Metformin"],
    medicalHistory: "Hypertension, Type 2 Diabetes",
    symptoms: "None reported",
    report: {
      summary: "Patient reports well-controlled blood pressure and blood sugar levels.",
      patient_symptoms: [
        { name: "Fatigue", is_gone: true },
        { name: "Excessive thirst", is_gone: true },
      ],
      predicted_disease: "Well-managed Hypertension and Diabetes",
      full_text: "Mr. Doe reports that his blood pressure and blood sugar levels have been well-controlled with current medications. He has been following a balanced diet and exercising regularly. No new symptoms reported.",
    },
  },
  "2": {
    id: "2",
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    bloodType: "O-",
    height: "165 cm",
    weight: "62 kg",
    allergies: ["Pollen", "Dust mites"],
    medications: ["Loratadine"],
    medicalHistory: "Seasonal allergies",
    symptoms: "Fever, cough, and fatigue for the past 3 days",
    report: {
      summary: "Patient presents with flu-like symptoms. Recommend symptomatic treatment and rest.",
      patient_symptoms: [
        { name: "Fever", is_gone: false },
        { name: "Cough", is_gone: false },
        { name: "Fatigue", is_gone: false },
      ],
      predicted_disease: "Influenza",
      full_text: "Ms. Smith reports onset of fever, cough, and fatigue 3 days ago. Symptoms are consistent with influenza. No signs of respiratory distress. Recommend symptomatic treatment, plenty of fluids, and rest. Follow up in 5-7 days if symptoms persist or worsen.",
    },
  },
  "3": {
    id: "3",
    name: "Bob Johnson",
    age: 45,
    gender: "Male",
    bloodType: "B+",
    height: "190 cm",
    weight: "85 kg",
    allergies: ["Shellfish"],
    medications: ["Aspirin"],
    medicalHistory: "Recent lumbar disc herniation, undergoing physical therapy",
    symptoms: "Improved lower back pain",
    report: {
      summary: "Patient reports improvement in lower back pain after physical therapy.",
      patient_symptoms: [
        { name: "Lower back pain", is_gone: true },
      ],
      predicted_disease: "Improved Lumbar Disc Herniation",
      full_text: "Mr. Johnson reports significant improvement in his lower back pain since starting physical therapy. He has been following the recommended exercises and has noticed a reduction in pain. He will continue with physical therapy and follow up in 4 weeks for further evaluation.",
    },
  },
  "4": {
    id: "4",
    name: "Alice Brown",
    age: 42,
    gender: "Female",
    bloodType: "AB-",
    height: "160 cm",
    weight: "60 kg",
    allergies: ["Latex"],
    medications: ["Ibuprofen"],
    medicalHistory: "Allergic to penicillin",
    symptoms: "None, routine vaccination",
    report: {
      summary: "Patient received routine vaccination with no adverse reactions.",
      patient_symptoms: [],
      predicted_disease: "No significant findings",
      full_text: "Mrs. Brown received her routine vaccination today. She reported no adverse reactions or symptoms. She will be scheduled for her next vaccination in 1 year.",
    },
  },
  "5": {
    id: "5",
    name: "Charlie Davis",
    age: 31,
    gender: "Male",
    bloodType: "A-",
    height: "175 cm",
    weight: "70 kg",
    allergies: ["Tree nuts"],
    medications: ["Simvastatin"],
    medicalHistory: "Eczema as a child",
    symptoms: "Itchy red rash on arms and legs",
    report: {
      summary: "Patient presents with itchy red rash on arms and legs. Recommend allergy testing.",
      patient_symptoms: [
        { name: "Itchy red rash on arms and legs", is_gone: false },
      ],
      predicted_disease: "Possible Allergic Reaction",
      full_text: "Mr. Davis reports an itchy red rash on his arms and legs that started yesterday. He has no known allergies, but his medical history includes eczema as a child. Recommend allergy testing to determine the cause of the rash. Follow up in 2 weeks for results.",
    },
  },
  "6": {
    id: "6",
    name: "Eva Wilson",
    age: 29,
    gender: "Female",
    bloodType: "O+",
    height: "170 cm",
    weight: "65 kg",
    allergies: ["Fish"],
    medications: ["Folic acid"],
    medicalHistory: "First pregnancy, no complications",
    symptoms: "Mild morning sickness",
    report: {
      summary: "Patient reports mild morning sickness during early pregnancy. Recommend dietary modifications and prenatal care.",
      patient_symptoms: [
        { name: "Mild morning sickness", is_gone: false },
      ],
      predicted_disease: "Normal Pregnancy",
      full_text: "Mrs. Wilson reports mild morning sickness during her first pregnancy. She has been following a balanced diet and taking folic acid supplements. Recommend regular prenatal care and dietary modifications to alleviate symptoms. Follow up in 2 weeks for further evaluation.",
    },
  },
  "7": {
    id: "7",
    name: "Frank Miller",
    age: 55,
    gender: "Male",
    bloodType: "B-",
    height: "185 cm",
    weight: "90 kg",
    allergies: ["Soy"],
    medications: ["Warfarin"],
    medicalHistory: "Hypertension, on medication",
    symptoms: "Occasional dizziness",
    report: {
      summary: "Patient reports occasional dizziness. Blood pressure is well-controlled. Recommend further evaluation for dizziness.",
      patient_symptoms: [
        { name: "Occasional dizziness", is_gone: false },
      ],
      predicted_disease: "Hypertension",
      full_text: "Mr. Miller reports occasional dizziness that has been present for a few weeks. His blood pressure has been well-controlled with medication. Recommend further evaluation to determine the cause of dizziness. Follow up in 2 weeks for further testing.",
    },
  },
  "8": {
    id: "8",
    name: "Grace Taylor",
    age: 36,
    gender: "Female",
    bloodType: "AB+",
    height: "168 cm",
    weight: "58 kg",
    allergies: ["Mold"],
    medications: ["Albuterol"],
    medicalHistory: "Asthma, well-controlled",
    symptoms: "Seasonal allergies",
    report: {
      summary: "Patient reports seasonal allergies. Asthma is well-controlled with medication. Recommend allergy testing and management plan.",
      patient_symptoms: [
        { name: "Seasonal allergies", is_gone: false },
      ],
      predicted_disease: "Asthma",
      full_text: "Ms. Taylor reports seasonal allergies that have been present for the past month. She has been using her albuterol inhaler as needed. Her asthma is well-controlled. Recommend allergy testing to determine the specific allergens and develop a management plan. Follow up in 2 weeks for results.",
    },
  },
  "9": {
    id: "9",
    name: "Henry Clark",
    age: 62,
    gender: "Male",
    bloodType: "A+",
    height: "180 cm",
    weight: "80 kg",
    allergies: ["Peanuts"],
    medications: ["Celecoxib"],
    medicalHistory: "Arthritis, previous knee surgery",
    symptoms: "Lower back pain, ongoing for 6 months",
    report: {
      summary: "Patient reports lower back pain, ongoing for 6 months. Recommend physical therapy and pain management.",
      patient_symptoms: [
        { name: "Lower back pain", is_gone: false },
      ],
      predicted_disease: "Chronic Lower Back Pain",
      full_text: "Mr. Clark reports lower back pain that has been ongoing for the past 6 months. He has been using celecoxib for pain management. Recommend physical therapy to strengthen muscles and improve mobility. Follow up in 2 weeks for further evaluation.",
    },
  },
  "10": {
    id: "10",
    name: "Ivy Martinez",
    age: 48,
    gender: "Female",
    bloodType: "O-",
    height: "165 cm",
    weight: "62 kg",
    allergies: ["Dust mites"],
    medications: ["Lisinopril"],
    medicalHistory: "Family history of diabetes",
    symptoms: "Increased thirst and frequent urination",
    report: {
      summary: "Patient reports increased thirst and frequent urination. Recommend further evaluation for diabetes.",
      patient_symptoms: [
        { name: "Increased thirst", is_gone: false },
        { name: "Frequent urination", is_gone: false },
      ],
      predicted_disease: "Diabetes",
      full_text: "Mrs. Martinez reports increased thirst and frequent urination that have been present for the past week. She has a family history of diabetes. Recommend further evaluation to determine if she is at risk for diabetes. Follow up in 2 weeks for further testing.",
    },
  },
  "11": {
    id: "11",
    name: "Jack Anderson",
    age: 39,
    gender: "Male",
    bloodType: "B+",
    height: "190 cm",
    weight: "85 kg",
    allergies: ["Shellfish"],
    medications: ["Aspirin"],
    medicalHistory: "No significant medical history",
    symptoms: "Blurry vision when reading",
    report: {
      summary: "Patient reports blurry vision when reading. Recommend further evaluation for possible eye condition.",
      patient_symptoms: [
        { name: "Blurry vision when reading", is_gone: false },
      ],
      predicted_disease: "Possible Eye Condition",
      full_text: "Mr. Anderson reports blurry vision when reading that has been present for the past month. He has no known eye conditions. Recommend further evaluation to determine the cause of blurry vision. Follow up in 2 weeks for further testing.",
    },
  },
  "12": {
    id: "12",
    name: "Karen White",
    age: 27,
    gender: "Female",
    bloodType: "AB-",
    height: "160 cm",
    weight: "60 kg",
    allergies: ["Latex"],
    medications: ["Ibuprofen"],
    medicalHistory: "Depression, managed with therapy",
    symptoms: "Anxiety and trouble sleeping",
    report: {
      summary: "Patient reports anxiety and trouble sleeping. Recommend further evaluation for depression.",
      patient_symptoms: [
        { name: "Anxiety", is_gone: false },
        { name: "Trouble sleeping", is_gone: false },
      ],
      predicted_disease: "Depression",
      full_text: "Ms. White reports anxiety and trouble sleeping that have been present for the past month. She has been managed with therapy for depression. Recommend further evaluation to determine if current treatment is effective. Follow up in 2 weeks for further testing.",
    },
  },
};

const borderColors = [
  "border-blue-400",
  "border-green-400",
  "border-purple-400",
  "border-pink-400",
  "border-yellow-400",
];

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<(Patient & { report: Report }) | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setSelectedPatient(mockPatients[appointment.id]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-3xl font-semibold mb-4">Today's Appointments</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {mockAppointments.map((appointment, index) => (
              <Card
                key={appointment.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  borderColors[index % borderColors.length]
                } ${
                  selectedAppointment?.id === appointment.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleAppointmentClick(appointment)}
              >
                <CardContent className="flex items-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <ClockIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{appointment.time}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <UserIcon className="w-4 h-4 mr-1" />
                      {appointment.patientName}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
        {selectedPatient ? (
          <Card className="w-full bg-white shadow-lg">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-2xl font-bold text-blue-800">
                {selectedPatient.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-6">
                  {/* Report Details */}
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-3">Report Summary</h3>
                    <p className="bg-blue-50 p-4 rounded-md text-gray-800">{selectedPatient.report.summary}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Patient Symptoms</h3>
                    <ul className="grid grid-cols-2 gap-3">
                      {selectedPatient.report.patient_symptoms.map((symptom, index) => (
                        <li key={index} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                          <span className="font-medium">{symptom.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            symptom.is_gone ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                          }`}>
                            {symptom.is_gone ? 'Resolved' : 'Ongoing'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Predicted Condition</h3>
                    <p className="bg-red-50 text-red-800 p-3 rounded-md font-medium">{selectedPatient.report.predicted_disease}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Full Report</h3>
                    <div className="bg-gray-100 p-4 rounded-md max-h-40 overflow-y-auto text-sm">
                      {selectedPatient.report.full_text}
                    </div>
                  </section>

                  <Separator />

                  {/* Patient Information */}
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Patient Information</h3>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {[
                          { label: "Age", value: selectedPatient.age },
                          { label: "Gender", value: selectedPatient.gender },
                          { label: "Blood Type", value: selectedPatient.bloodType },
                          { label: "Height", value: selectedPatient.height },
                          { label: "Weight", value: selectedPatient.weight },
                        ].map((item, index) => (
                          <div key={index}>
                            <dt className="font-semibold text-gray-600">{item.label}</dt>
                            <dd className="mt-1 text-gray-900">{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Allergies</h3>
                    <ul className="list-disc list-inside bg-red-50 p-4 rounded-md text-gray-800">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Current Medications</h3>
                    <ul className="list-disc list-inside bg-purple-50 p-4 rounded-md text-gray-800">
                      {selectedPatient.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Medical History</h3>
                    <p className="bg-gray-100 p-4 rounded-md text-gray-800">{selectedPatient.medicalHistory}</p>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <p>Select an appointment to view details.</p>
        )}
      </div>
    </div>
  );
}