"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProfilePage() {
  const [patient, setPatient] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 35,
    gender: "Male",
    bloodType: "A+",
  });

  const [reports, setReports] = useState([
    { id: 1, date: "2024-03-15", type: "Blood Test", status: "Completed" },
    { id: 2, date: "2024-02-20", type: "X-Ray", status: "Pending" },
    { id: 3, date: "2024-01-10", type: "General Checkup", status: "Completed" },
  ]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen w-full">
      <div className="container mx-auto p-6">
        <h1 className="text-6xl font-semibold mt-16 mb-24 tracking-wide">Welcome, {patient.name}!</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-blue-700">Report History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-green-50 transition-colors">
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {report.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-700">Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
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
                  <dd className="text-green-800">{patient.age}</dd>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <dt className="font-medium">Gender</dt>
                  <dd className="text-green-800">{patient.gender}</dd>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <dt className="font-medium">Blood Type</dt>
                  <dd className="text-green-800">{patient.bloodType}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
