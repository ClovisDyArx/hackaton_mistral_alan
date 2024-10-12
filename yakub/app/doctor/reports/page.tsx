"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Report = {
  id: string;
  date: string;
  patientName: string;
  type: string;
  doctor: string;
  summary: string;
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
};

const mockReports: Report[] = [
  {
    id: "1",
    date: "2024-03-19",
    patientName: "John Doe",
    type: "Blood Test",
    doctor: "Dr. Smith",
    summary: "Normal blood count, slightly elevated cholesterol.",
  },
  {
    id: "2",
    date: "2024-03-20",
    patientName: "Jane Smith",
    type: "X-Ray",
    doctor: "Dr. Johnson",
    summary: "No fractures detected, mild joint inflammation.",
  },
  // ... add more mock reports with the new fields ...
];

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
    setSelectedPatient(mockPatients[report.id]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-2xl font-semibold mb-4">Reports</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {mockReports
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((report) => (
                <Card
                  key={report.id}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleReportClick(report)}
                >
                  <CardHeader>
                    <CardTitle>{report.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Date:</strong> {report.date}</p>
                    <p><strong>Patient:</strong> {report.patientName}</p>
                    <p><strong>Doctor:</strong> {report.doctor}</p>
                    <p><strong>Summary:</strong> {report.summary}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-2/3 p-4">
        {selectedReport && (
          <Card className="w-full mb-4">
            <CardHeader>
              <CardTitle>Selected Report</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold">Date</dt>
                  <dd>{selectedReport.date}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Type</dt>
                  <dd>{selectedReport.type}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Patient</dt>
                  <dd>{selectedReport.patientName}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Doctor</dt>
                  <dd>{selectedReport.doctor}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-semibold">Summary</dt>
                  <dd>{selectedReport.summary}</dd>
                </div>
              </dl>
              <Button className="mt-4">View Full Report</Button>
            </CardContent>
          </Card>
        )}
        {selectedPatient && (
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
        )}
      </div>
    </div>
  );
}
