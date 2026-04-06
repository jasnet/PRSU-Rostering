import React from 'react';

export default function SpecialityClinic() {
    const clinics = [
        { clinic: "Psychomotor And Neropsychiatry Clinic", day: "Monday", time: "9:00 AM TO 4:30 PM" },
        { clinic: "Deaddiction Clinic", day: "Tuesday", time: "9:00 AM TO 4:30 PM" },
        { clinic: "Child Psychiatry Clinic", day: "Wednesday", time: "9:00 AM TO 4:30 PM" },
        { clinic: "Family Counselling AndMarital Therapy", day: "Thursday", time: "9:00 AM TO 4:30 PM" },
        { clinic: "Senile Disorders And Memory Clinic", day: "Friday", time: "9:00 AM TO 4:30 PM" }
    ];

    return (
        <div className="container container-fluid my-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
                    <h5 className="text-secondary fw-bold mb-0">DEPARTMENT OF PSYCHIATRY</h5>
                    <h2 className="text-danger fw-bold display-6" style={{ letterSpacing: '1px' }}>SPECIALITY CLINIC</h2>
                </div>
                <div className="card-body p-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '1.1rem' }}>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th className="py-3 px-4 rounded-start" style={{ width: '45%' }}>Speciality Clinic</th>
                                    <th className="py-3 px-4">Days</th>
                                    <th className="py-3 px-4 rounded-end text-end">Timings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clinics.map((item, idx) => (
                                    <tr key={idx} className="border-bottom">
                                        <td className="py-4 px-4 fw-bold text-secondary">{item.clinic}</td>
                                        <td className="py-4 px-4 text-secondary">{item.day}</td>
                                        <td className="py-4 px-4 text-end fw-bold text-secondary">{item.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer bg-light border-0 py-3 text-end rounded-bottom-4">
                    <span className="fw-bold text-primary fs-5 border border-primary px-3 py-1 rounded-pill">
                        <i className="fas fa-compass me-2"></i> PESUIMSR
                    </span>
                </div>
            </div>
        </div>
    );
}
