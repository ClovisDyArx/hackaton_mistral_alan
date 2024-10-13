"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
  symptoms: string;
  medicalHistory: string;
};

const mockAppointments: Appointment[] = [
  { id: "1", time: "09:00 AM", patientName: "John Doe", reason: "Annual checkup" },
  { id: "2", time: "10:30 AM", patientName: "Jane Smith", reason: "Flu symptoms" },
  { id: "3", time: "02:00 PM", patientName: "Bob Johnson", reason: "Follow-up appointment" },
  // Add more mock appointments as needed
];

const mockPatients: { [key: string]: Patient } = {
  "1": {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "Male",
    symptoms: "None reported",
    medicalHistory: "Hypertension, managed with medication",
  },
  "2": {
    id: "2",
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    symptoms: "Fever, cough, and fatigue for the past 3 days",
    medicalHistory: "No significant medical history",
  },
  "3": {
    id: "3",
    name: "Bob Johnson",
    age: 45,
    gender: "Male",
    symptoms: "Improved lower back pain",
    medicalHistory: "Recent lumbar disc herniation, undergoing physical therapy",
  },
  // Add more mock patients as needed
};

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setSelectedPatient(mockPatients[appointment.id]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-2xl font-semibold mb-4">Today's Appointments</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
        {selectedPatient ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedPatient.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Reason for Visit:</strong> {selectedAppointment?.reason}</p>
              <p><strong>Symptoms:</strong> {selectedPatient.symptoms}</p>
              <p><strong>Medical History:</strong> {selectedPatient.medicalHistory}</p>
            </CardContent>
          </Card>
        ) : (
          <p>Select an appointment to view patient information.</p>
        )}
      </div>
    </div>
  );
}
