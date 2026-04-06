import React, { useState } from 'react';
import './Roster.css';

export default function Roster({ type }) {
    // Generate dates 1 to 31
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Mock data for nurses and doctors to match the photo vibe
    const nursesData = [
        { sl: 1, name: "ARCHANA", schedule: ["W/O", "G", "G", "G", "G", "G", "G", "G", "G", "W/O", "G", "G", "G", "G", "G", "W/O", "EL", "G", "G", "G", "G", "G", "G", "CL", "G", "G", "G", "G", "G", "G", "G"] },
        { sl: 2, name: "NEELAVATHI", schedule: ["N", "N", "N", "W/O", "E", "E", "E", "W/O", "E", "E", "M", "M", "W/O", "E", "M", "M", "M", "M", "M", "M", "E", "M", "W/O", "E", "M", "M", "M", "M", "M", "M", "N"] },
        { sl: 3, name: "SIREESHA", schedule: ["G", "G", "G", "G", "W/O", "G", "G", "G", "G", "G", "G", "G", "G", "W/O", "G", "G", "G", "G", "G", "G", "W/O", "G", "G", "G", "G", "G", "G", "W/O", "G", "G", "G"] },
        { sl: 4, name: "POOJA", schedule: ["M", "M", "W/O", "N", "N", "N", "N", "N", "N", "N", "W/O", "N", "E", "M", "M", "M", "M", "M", "W/O", "E", "E", "E", "E", "W/O", "E", "E", "E", "E", "E", "E", "E"] },
        { sl: 5, name: "DEEKSHITA", schedule: ["M", "M", "M", "W/O", "M", "M", "N", "N", "N", "N", "N", "W/O", "N", "N", "N", "N", "N", "N", "W/O", "N", "N", "N", "N", "N", "W/O", "E", "E", "E", "E", "E", "E"] },
    ];

    const doctorsData = [
        { sl: 1, name: "Dr. John Smith", schedule: ["G", "G", "G", "G", "G", "W/O", "W/O", "G", "G", "G", "G", "G", "W/O", "W/O", "G", "G", "G", "G", "G", "W/O", "W/O", "G", "G", "G", "G", "G", "W/O", "W/O", "G", "G", "G"] },
        { sl: 2, name: "Dr. Sarah Lee", schedule: ["M", "M", "E", "E", "N", "N", "W/O", "M", "M", "E", "E", "N", "N", "W/O", "M", "M", "E", "E", "N", "N", "W/O", "M", "M", "E", "E", "N", "N", "W/O", "M", "M", "E"] },
    ];

    const data = type === 'Nurses' ? nursesData : doctorsData;

    return (
        <div className="container-fluid my-4 px-4 overflow-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold">{type.toUpperCase()} DUTY ROSTER FOR THE MONTH OF JAN</h3>
            </div>
            
            <div className="table-responsive shadow-sm border rounded bg-white">
                <table className="table table-bordered table-sm text-center mb-0 roster-table">
                    <thead className="table-dark">
                        <tr>
                            <th rowSpan="2" className="align-middle" style={{ width: '50px' }}>SL.<br/>NO.</th>
                            <th rowSpan="2" className="align-middle text-start" style={{ minWidth: '150px' }}>NAME</th>
                            <th colSpan="31" className="bg-secondary text-white">DATE &#9654;</th>
                        </tr>
                        <tr>
                            {days.map(day => (
                                <th key={day} style={{ minWidth: '35px', padding: '5px' }}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((person, idx) => (
                            <tr key={idx}>
                                <td className="fw-bold bg-light">{person.sl}</td>
                                <td className="text-start fw-bold bg-light ps-2">{person.name}</td>
                                {days.map((day, dIdx) => {
                                    // Use schedule value or empty if array not long enough
                                    const shift = person.schedule[dIdx] || "";
                                    
                                    // Assign colors based on shift type
                                    let cellColor = "";
                                    if (shift === "W/O") cellColor = "text-danger fw-bold";
                                    else if (shift === "M") cellColor = "text-primary";
                                    else if (shift === "E") cellColor = "text-success";
                                    else if (shift === "N") cellColor = "text-purple";
                                    else if (shift === "G") cellColor = "text-secondary";
                                    
                                    return (
                                        <td key={dIdx} className={`align-middle ${cellColor}`}>
                                            {shift}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
