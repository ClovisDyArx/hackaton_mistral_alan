"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const [patient, setPatient] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 35,
    gender: "Male",
    bloodType: "A+",
    address: "123 Main St, Anytown, USA 12345",
  });

  const [reports, setReports] = useState([
    { id: 1, date: "2024-03-15", type: "Blood Test", status: "Completed" },
    { id: 2, date: "2024-02-20", type: "X-Ray", status: "Pending" },
    { id: 3, date: "2024-01-10", type: "General Checkup", status: "Completed" },
  ]);

  const [drugIntolerances, setDrugIntolerances] = useState([
    "Penicillin",
    "Aspirin",
    "Codeine",
  ]);

  const [consultations, setConsultations] = useState([
    { id: 1, date: "2024-03-15", disease: "Common Cold", dataShared: true },
    { id: 2, date: "2024-02-20", disease: "Sprained Ankle", dataShared: false },
    { id: 3, date: "2024-01-10", disease: "Annual Checkup", dataShared: true },
    { id: 4, date: "2023-11-05", disease: "Flu Vaccination", dataShared: true },
    { id: 5, date: "2023-09-18", disease: "Migraine", dataShared: false },
  ]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen w-full">
      <div className="container mx-auto p-6">
        <h1 className="text-6xl font-semibold mt-16 mb-24 tracking-wide">Welcome back, {patient.name}!</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-blue-700 text-xl">Consultation History</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4">
                {consultations.map((consultation) => (
                  <Card key={consultation.id} className="border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold block mb-1">{consultation.date}</span>
                          <p className="text-gray-600">{consultation.disease}</p>
                        </div>
                        <Badge
                          className={`px-3 py-1 text-sm ${
                            consultation.dataShared
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {consultation.dataShared ? "Data Shared" : "Data Not Shared"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-700 text-xl">Your informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4 pt-4">
                <Avatar className="w-16 h-16 border-2">
                  <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{patient.name}</h2>
                  <p className="text-sm">{patient.email}</p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-2 rounded">
                  <dt className="font-medium">Age</dt>
                  <dd className="text-lg font-bold">{patient.age}</dd>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <dt className="font-medium">Gender</dt>
                  <dd className="text-lg font-bold">{patient.gender}</dd>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <dt className="font-medium">Blood Type</dt>
                  <dd className="text-lg font-bold">{patient.bloodType}</dd>
                </div>
                <div className="bg-green-50 p-2 rounded col-span-2">
                  <dt className="font-medium">Address</dt>
                  <dd className="text-lg font-bold">{patient.address}</dd>
                </div>
                <div className="bg-green-50 p-2 rounded col-span-2">
                  <dt className="font-medium">Drug Intolerances</dt>
                  <dd className="text-lg font-bold">
                    <ul className="list-disc list-inside">
                      {drugIntolerances.map((drug, index) => (
                        <li key={index}>{drug}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
