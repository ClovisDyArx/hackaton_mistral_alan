"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import exampleReports from "@/app/examples/reports";
import { Report } from "@/app/types";
import { CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  const handleAcceptReport = (report: Report) => {
    // TODO: Implement accept logic
    console.log("Accepted report:", report);
  };

  const handleRejectReport = (report: Report) => {
    // TODO: Implement reject logic
    console.log("Rejected report:", report);
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
                className={`cursor-pointer hover:shadow-md transition-shadow duration-200 ${
                  selectedReport === report ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleReportClick(report)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`text-xl ${
                    selectedReport === report ? 'text-blue-800' : 'text-blue-600'
                  }`}>
                    {report.predicted_disease}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2"><strong>Patient:</strong> John Doe</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>Summary:</strong> {report.summary}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="text-sm"
                    >
                      View Details
                    </Button>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptReport(report);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectReport(report);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-1/2 p-4">
        <Card className="w-full h-full bg-white shadow-lg">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-2xl font-bold text-blue-800">
              {selectedReport ? "Selected Report" : "Report Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedReport ? (
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-3">Summary</h3>
                    <p className="bg-blue-50 p-4 rounded-md text-gray-800">{selectedReport.summary}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Patient Symptoms</h3>
                    <ul className="grid grid-cols-2 gap-3">
                      {selectedReport.patient_symptoms.map((symptom, index) => (
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
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Predicted Disease</h3>
                    <p className="bg-red-50 text-red-800 p-3 rounded-md font-medium">{selectedReport.predicted_disease}</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Full Transcription</h3>
                    <div className="bg-gray-100 p-4 rounded-md max-h-40 overflow-y-auto text-sm">
                      {selectedReport.full_text}
                    </div>
                  </section>
                </div>
                
                <Separator className="my-8" />
                
                <section className="mt-8">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Patient Information</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {[
                        { label: "Name", value: selectedPatient?.name },
                        { label: "Age", value: selectedPatient?.age },
                        { label: "Gender", value: selectedPatient?.gender },
                        { label: "Blood Type", value: selectedPatient?.bloodType },
                        { label: "Height", value: selectedPatient?.height },
                        { label: "Weight", value: selectedPatient?.weight },
                      ].map((item, index) => (
                        <div key={index}>
                          <dt className="font-semibold text-gray-600">{item.label}</dt>
                          <dd className="mt-1 text-gray-900">{item.value}</dd>
                        </div>
                      ))}
                      <div className="col-span-2">
                        <dt className="font-semibold text-gray-600">Allergies</dt>
                        <dd className="mt-1 text-gray-900">{selectedPatient?.allergies.join(", ")}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="font-semibold text-gray-600">Medications</dt>
                        <dd className="mt-1 text-gray-900">{selectedPatient?.medications.join(", ")}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="font-semibold text-gray-600">Medical History</dt>
                        <dd className="mt-1 text-gray-900">{selectedPatient?.medicalHistory}</dd>
                      </div>
                    </dl>
                  </div>
                </section>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-gray-500 text-lg mt-10">
                  Please select a report from the list to view details.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
