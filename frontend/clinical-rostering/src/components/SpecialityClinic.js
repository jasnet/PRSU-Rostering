import React from 'react';

export default function SpecialityClinic() {
    const rosterData = [
        { clinic: "Neuropsychiatry Clinic", subtext: "UNIT 1. MONDAY BATCH", day: "Monday", doctor: "Dr. Nandhana" },
        { clinic: "Deaddiction Clinic", subtext: "UNIT 4. TUESDAY BATCH", day: "Tuesday", doctor: "Dr. Keya Das" },
        { clinic: "Child Psychiatry Clinic", subtext: "UNIT 2. WEDNESDAY BATCH", day: "Wednesday", doctor: "Dr. Bhavyasree" },
        { clinic: "Family & Psychosexual Clinic", subtext: "MARITAL THERAPY. THURSDAY BATCH", day: "Thursday", doctor: "Dr. Nishanth Reddy A, Mr. Jesu Maria Dass" },
        { clinic: "Geriatric Mental Health Clinic", subtext: "SENILE DISORDERS CARE", day: "Friday", doctor: "Dr. Madhusekhar" }
    ];

    const allDoctors = [
        "Dr. Keya Das",
        "Dr. Bhavyasree",
        "Dr. Madhu Sekhar",
        "Dr. Nishanth Reddy. A",
        "Dr. S. Nandhana",
        "Dr. Ramesh Aravind",
        "Dr. Jaffer Sadiq",
        "Ms. Delna Joseph",
        "Mr. Jesu Maria Dass"
    ];

    return (
        <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
            <div className="container pt-5">
                
                {/* Hero Banner Section */}
                <div className="card border-0 rounded-4 shadow-sm mb-5 overflow-hidden" style={{ backgroundColor: "#1e3050" }}>
                    <div className="row g-0">
                        <div className="col-lg-8 p-5">
                            <span className="badge bg-orange text-white px-3 py-2 rounded-pill fs-7 mb-3 tracking-wider d-inline-block">DEPARTMENT SERVICES</span>
                            <h1 className="fw-bolder text-white mb-3 display-4" style={{ fontWeight: "800" }}>Department of <span className="text-orange">Psychiatry</span></h1>
                            <p className="text-white opacity-75 fs-5 mb-0" style={{ maxWidth: "600px", lineHeight: "1.6" }}>
                                Comprehensive mental wellness and clinical excellence for adults, children, and geriatric populations.
                            </p>
                        </div>
                        <div className="col-lg-4 d-none d-lg-block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: "0.4" }}>
                        </div>
                    </div>
                </div>

                {/* Duty Doctor Banner (Simulating the left nav bar widget from image) */}
                <div className="row mb-5">
                    <div className="col-lg-4">
                         <div className="card border-0 rounded-4 shadow-sm text-white p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: "#1e3050" }}>
                            <div>
                                <h6 className="fw-bold opacity-75 mb-1 small tracking-wider text-uppercase">On-Call Duty</h6>
                                <h3 className="fw-bold mb-0">Duty Doctor</h3>
                                <div className="d-flex align-items-center gap-2 mt-2">
                                    <span style={{ width: '10px', height: '10px', backgroundColor: '#f47b2c', borderRadius: '50%', display: 'inline-block' }}></span>
                                    <span className="opacity-75 small">Dr. Jaffer Sadiq</span>
                                </div>
                            </div>
                            <div>
                                <i className="fas fa-user-md fa-3x opacity-25"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-5">
                    {/* Left Column: Roster Table */}
                    <div className="col-lg-8">
                        <h4 className="fw-bolder text-navy mb-4 d-flex align-items-center">
                            Speciality Clinic Roster
                            <div className="ms-auto d-flex gap-1">
                                <span style={{ width: '6px', height: '6px', backgroundColor: '#f47b2c', borderRadius: '50%', display: 'inline-block' }}></span>
                                <span style={{ width: '6px', height: '6px', backgroundColor: '#1e3050', opacity: 0.2, borderRadius: '50%', display: 'inline-block' }}></span>
                                <span style={{ width: '6px', height: '6px', backgroundColor: '#1e3050', opacity: 0.2, borderRadius: '50%', display: 'inline-block' }}></span>
                            </div>
                        </h4>

                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="bg-light">
                                            <tr className="text-uppercase text-secondary" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                                                <th className="py-3 px-4 fw-bold border-0" style={{ width: '40%' }}>Speciality Clinic</th>
                                                <th className="py-3 fw-bold border-0">Days</th>
                                                <th className="py-3 px-4 fw-bold border-0 text-end">Doctor In-Charge</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rosterData.map((item, idx) => (
                                                <tr key={idx} className="border-bottom">
                                                    <td className="py-4 px-4">
                                                        <h6 className="fw-bold text-navy mb-1">{item.clinic}</h6>
                                                        <p className="text-muted small mb-0 tracking-wider" style={{ fontSize: "0.75rem" }}>{item.subtext}</p>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className="badge bg-blue-soft text-navy px-3 py-2 rounded-pill fs-7">{item.day}</span>
                                                    </td>
                                                    <td className="py-4 px-4 text-end">
                                                        <div className="d-flex align-items-center justify-content-end gap-3">
                                                            <div className="rounded-circle bg-light d-flex justify-content-center align-items-center text-secondary small fw-bold" style={{ width: '30px', height: '30px' }}>
                                                                <i className="far fa-user"></i>
                                                            </div>
                                                            <span className="fw-bold text-navy" style={{ fontSize: "0.95rem" }}>{item.doctor}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Staff Registry */}
                    <div className="col-lg-4">
                        <h4 className="fw-bolder text-navy mb-4">Staff Registry</h4>
                        
                        <div className="card shadow-sm border-0 rounded-4 bg-white">
                            <div className="card-body p-4 p-md-5">
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <i className="fas fa-users text-orange"></i>
                                    <h6 className="fw-bold text-navy m-0">Department Doctors</h6>
                                </div>

                                <ul className="list-unstyled mb-4 d-flex flex-column gap-3">
                                    {allDoctors.map((doc, i) => (
                                        <li key={i} className="d-flex align-items-center gap-3">
                                            <span style={{ width: '5px', height: '5px', backgroundColor: '#1e3050', borderRadius: '50%', display: 'inline-block', opacity: 0.5 }}></span>
                                            <span className="fw-bold text-secondary" style={{ fontSize: "0.95rem" }}>{doc}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-3 bg-orange-soft rounded-3 mt-4">
                                    <p className="text-orange small mb-0 fw-bold d-flex align-items-start gap-2">
                                        <i className="fas fa-info-circle mt-1"></i>
                                        Please contact admin for any emergency substitution in the duty roster.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <style>
                {`
                    .bg-orange { background-color: #f47b2c; }
                    .text-orange { color: #f47b2c !important; }
                    .bg-orange-soft { background-color: #fcece3; }
                    .bg-blue-soft { background-color: #e6ebf5; }
                    .fs-7 { font-size: 0.85rem; }
                `}
            </style>
        </div>
    );
}
