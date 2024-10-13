"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import exampleReports from "@/app/examples/reports";
import { Report } from "@/app/types";

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
};

const mockPatients: { [key: string]: Patient } = {
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
  },
  // Add more mock patients as needed
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    // For now, we'll just use the first mock patient
    setSelectedPatient(mockPatients["1"]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-3xl font-semibold mb-4">Upcoming reports</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {exampleReports.map((report, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleReportClick(report)}
              >
                <CardHeader>
                  <CardTitle>{report.predicted_disease}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Summary:</strong> {report.summary}</p>
                  <p><strong>Emotion:</strong> {report.emotion_analysis}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-2/3 p-4">
        {selectedReport ? (
          <>
            <Card className="w-full mb-4">
              <CardHeader>
                <CardTitle className="text-2xl">Selected Report</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <dt className="font-semibold">Full Text</dt>
                    <dd>{selectedReport.full_text}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Predicted Disease</dt>
                    <dd>{selectedReport.predicted_disease}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Real Disease</dt>
                    <dd>{selectedReport.real_disease}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-semibold">Patient Symptoms</dt>
                    <dd>{selectedReport.patient_symptoms.map(s => `${s.name} (${s.intensity})`).join(", ")}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-semibold">Real Symptoms</dt>
                    <dd>{selectedReport.real_symptoms.map(s => `${s.name} (${s.intensity})`).join(", ")}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-semibold">Treatment</dt>
                    <dd>{selectedReport.treament.map(t => `${t.name} (${t.quantity} ${t.frequency}x${t.time})`).join(", ")}</dd>
                  </div>
                </dl>
                <Button className="mt-4">View Full Report</Button>
              </CardContent>
            </Card>
            {selectedPatient ? (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="font-semibold">Name</dt>
                      <dd>{selectedPatient.name}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Age</dt>
                      <dd>{selectedPatient.age}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Gender</dt>
                      <dd>{selectedPatient.gender}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Blood Type</dt>
                      <dd>{selectedPatient.bloodType}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Height</dt>
                      <dd>{selectedPatient.height}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Weight</dt>
                      <dd>{selectedPatient.weight}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold">Allergies</dt>
                      <dd>{selectedPatient.allergies.join(", ")}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold">Medications</dt>
                      <dd>{selectedPatient.medications.join(", ")}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold">Medical History</dt>
                      <dd>{selectedPatient.medicalHistory}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full flex items-center justify-center pt-6">
                <CardContent>
                  <p className="text-gray-500 text-center">
                    No patient information available.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="w-full h-full flex items-center justify-center">
            <CardContent>
              <p className="text-xl text-gray-500">
                Please select a report from the list to view details.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
