import React, { useState, useRef } from 'react';

export default function Roster({ type }) {
    const [selectedDate] = useState('2026-01-01'); // YYYY-MM-DD
    const [showNewEntry, setShowNewEntry] = useState(false);
    const fileInputRef = useRef(null);
    
    const dateObj = new Date(selectedDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    
    // For rendering exactly 15 days in the main view (to match the clean image layout):
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: Math.min(daysInMonth, 15) }, (_, i) => i + 1); 
    
    const getDayLetter = (dayInt) => {
        const d = new Date(year, month, dayInt);
        return d.toLocaleDateString('en-US', { weekday: 'narrow' });
    }

    const monthName = dateObj.toLocaleString('default', { month: 'long' });

    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    const [nursesData, setNursesData] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);

    React.useEffect(() => {
        // Base mock data mapping for demo purposes. 
        // We filter this to only show the CURRENT user logged in.
        let me = { sl: "01", name: user?.e_name || "Unknown", initials: (user?.e_name || "UN").substring(0,2).toUpperCase(), schedule: ["M", "M", "E", "W/O", "N", "M", "G", "M", "M", "M", "M", "M", "M", "M", "M"] };
        
        if (user) {
            if (type === 'Nurses' && (user.e_type === 'Nurse' || user.e_type === 'Staff')) {
                setNursesData([me]);
            } else if (type === 'Doctors' && user.e_type === 'Doctor') {
                setDoctorsData([me]);
            }
        }
    }, [user, type]);

    const data = type === 'Nurses' ? nursesData : doctorsData;

    const handlePdfUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            alert(`PDF "${e.target.files[0].name}" has been uploaded to the system successfully!`);
        }
    };

    const handleAddNewEntry = (e) => {
        e.preventDefault();
        const newName = e.target.entryName.value || "NEW MEMBER";
        const newInitials = newName.substring(0, 2).toUpperCase();
        const newSl = String(data.length + 1).padStart(2, '0');
        const defaultSchedule = Array(15).fill("M");
        
        const newMember = { sl: newSl, name: newName, initials: newInitials, schedule: defaultSchedule };
        
        if (type === 'Nurses') {
            setNursesData([...nursesData, newMember]);
        } else {
            setDoctorsData([...doctorsData, newMember]);
        }
        
        setShowNewEntry(false); // Close the form
    }

    const getShiftBadge = (shift) => {
        let classes = "d-flex justify-content-center align-items-center rounded-3 fw-bold small m-auto";
        let style = { width: "32px", height: "32px", fontSize: "0.85rem" };

        switch(shift) {
            case "M": classes += " bg-m text-navy"; break;
            case "E": classes += " bg-e text-orange"; break;
            case "N": classes += " bg-n text-white"; break;
            case "G": classes += " bg-g text-secondary"; break;
            case "W/O": classes += " bg-wo text-white"; style.fontSize = "0.7rem"; break;
            default: classes += " bg-light text-secondary"; break;
        }

        return <div className={classes} style={style}>{shift}</div>;
    }

    return (
        <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
            <div className="container-fluid pt-5 px-4 px-lg-5">
                
                {/* Header Sequence */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
                    <div>
                        <h1 className="fw-bolder text-navy mb-1" style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}>{type} Duty Roster</h1>
                        <p className="text-secondary fw-bold mb-0">Monthly Schedule Deployment & Logistics — {monthName} {year}</p>
                    </div>
                    <div className="d-flex gap-3 mt-4 mt-md-0">
                        <input type="file" accept=".pdf" ref={fileInputRef} onChange={handlePdfUpload} style={{ display: 'none' }} />
                        <button className="btn btn-light border fw-bold text-secondary px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 transition-all hover-translate-y" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                            <i className="fas fa-upload"></i> UPLOAD PDF
                        </button>
                        <button className="btn text-white fw-bold px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 transition-all hover-translate-y" style={{ backgroundColor: "#1e3050" }} onClick={() => setShowNewEntry(!showNewEntry)}>
                            <i className={`fas ${showNewEntry ? 'fa-times' : 'fa-plus'}`}></i> {showNewEntry ? 'CANCEL' : 'NEW ENTRY'}
                        </button>
                    </div>
                </div>

                {/* New Entry Form Card */}
                {showNewEntry && (
                    <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ backgroundColor: '#e6ebf5' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold text-navy mb-3">Add New {type} to Roster</h5>
                            <form onSubmit={handleAddNewEntry} className="row g-3 align-items-end">
                                <div className="col-md-6">
                                    <label className="form-label text-secondary fw-bold small">PRACTITIONER NAME</label>
                                    <input type="text" name="entryName" className="form-control px-3 py-2 border-0 shadow-sm rounded-3" placeholder={`e.g., ${type === 'Nurses' ? 'ALISHA' : 'Dr. Banner'}`} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary fw-bold small">DEFAULT SHIFT</label>
                                    <select className="form-select px-3 py-2 border-0 shadow-sm rounded-3">
                                        <option value="M">Morning Shift</option>
                                        <option value="E">Evening Shift</option>
                                        <option value="N">Night Shift</option>
                                        <option value="G">General Shift</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn w-100 text-white fw-bold py-2 rounded-3 shadow-sm" style={{ backgroundColor: "#f47b2c" }}>Save Entry</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Legends */}
                <div className="row g-3 mb-5">
                    {[
                        { title: "MORNING", s: "M", t: "08:00 - 14:00", border: "#e6ebf5" },
                        { title: "EVENING", s: "E", t: "14:00 - 20:00", border: "#fcece3" },
                        { title: "NIGHT", s: "N", t: "20:00 - 08:00", border: "#1e3050" },
                        { title: "GENERAL", s: "G", t: "09:00 - 17:00", border: "#f8f9fa" },
                        { title: "WEEK OFF", s: "W/O", icon: "far fa-calendar-times text-danger", border: "#ffcccc" }
                    ].map((idx, i) => (
                        <div className="col" key={i} style={{ minWidth: '140px' }}>
                            <div className="card border-0 rounded-4 shadow-sm h-100 overflow-hidden">
                                <div className="d-flex h-100">
                                    <div style={{ width: "6px", backgroundColor: idx.s === "M" ? "#1e3050" : idx.s === "E" ? "#f47b2c" : idx.s === "N" ? "#1e3050" : idx.s === "W/O" ? "#dc3545" : "#adb5bd" }}></div>
                                    <div className="p-3 w-100 d-flex flex-column justify-content-center bg-white">
                                        <span className="text-secondary small fw-bold" style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>{idx.title}</span>
                                        <div className="d-flex align-items-center justify-content-between mt-1">
                                            <span className="fw-bolder fs-4" style={{ color: idx.s === "W/O" ? "#dc3545" : "#1e3050" }}>{idx.s}</span>
                                            {idx.t ? (
                                                <span className="text-muted" style={{ fontSize: "0.75rem", backgroundColor: idx.border, padding: "2px 6px", borderRadius: "4px", fontWeight: "600", whiteSpace: 'nowrap' }}>{idx.t}</span>
                                            ) : (
                                                <i className={`${idx.icon} fs-5 opacity-75`}></i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="card shadow-sm border-0 rounded-4 mb-5 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover table-borderless align-middle mb-0" style={{ whiteSpace: "nowrap" }}>
                            <thead className="bg-light" style={{ borderBottom: "2px solid #eaeaea" }}>
                                <tr className="text-uppercase text-secondary" style={{ fontSize: "0.75rem", letterSpacing: "1px", height: "60px" }}>
                                    <th className="px-4 fw-bold align-middle" style={{ width: "80px" }}>SL.</th>
                                    <th className="px-4 fw-bold align-middle">
                                        {type === 'Nurses' ? "NURSE PRACTITIONER NAME" : "DOCTOR NAME"}
                                    </th>
                                    {days.map(day => (
                                        <th key={day} className="text-center align-middle" style={{ width: "50px" }}>
                                            <div className="d-flex flex-column fw-bold">
                                                <span className="text-navy fs-6 mb-1">{day}</span>
                                                <span className="text-muted" style={{ fontSize: "0.6rem" }}>{getDayLetter(day)}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((person, idx) => (
                                    <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                                        <td className="px-4 text-muted fw-bold">{person.sl}</td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle d-flex justify-content-center align-items-center text-navy fw-bold" style={{ width: "35px", height: "35px", backgroundColor: "#e6ebf5", fontSize: "0.85rem" }}>
                                                    {person.initials}
                                                </div>
                                                <span className="fw-bolder text-navy text-uppercase tracking-wider fs-6">{person.name}</span>
                                            </div>
                                        </td>
                                        {days.map((day, dIdx) => (
                                            <td key={dIdx} className="text-center px-1">
                                                {getShiftBadge(person.schedule[dIdx] || "")}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Widgets */}
                <div className="row g-4 mb-5">
                    
                    {/* Shift Handover Notes */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 rounded-4 bg-white h-100 p-4">
                            <h5 className="fw-bolder text-navy d-flex align-items-center gap-2 mb-4">
                                <i className="fas fa-clipboard-list text-muted"></i> Shift Handover Notes
                            </h5>
                            <div className="d-flex flex-column gap-3">
                                <div className="p-3 bg-light rounded-3 d-flex shadow-sm">
                                    <div style={{ width: "4px", backgroundColor: "#f47b2c", borderRadius: "10px", marginRight: "15px" }}></div>
                                    <p className="mb-0 text-navy fw-bold fst-italic">"Ensure 24/7 coverage in the Cardiac ICU due to increased admissions on Jan 14-16."</p>
                                </div>
                                <div className="p-3 bg-light rounded-3 d-flex shadow-sm">
                                    <div style={{ width: "4px", backgroundColor: "#1e3050", borderRadius: "10px", marginRight: "15px" }}></div>
                                    <p className="mb-0 text-navy fw-bold fst-italic">"Double-check OT sterilization schedules for General Shift staff on Mondays."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coverage Heatmap */}
                    <div className="col-lg-4">
                        <div className="card shadow-lg border-0 rounded-4 h-100 p-4 text-white position-relative overflow-hidden" style={{ backgroundColor: "#1e3050" }}>
                            <h5 className="fw-bold mb-4 z-index-1 position-relative">Coverage Heatmap</h5>
                            
                            <div className="d-flex flex-column gap-4 position-relative z-index-1">
                                <div>
                                    <div className="d-flex justify-content-between mb-1 small fw-bold">
                                        <span>Morning Shift (M)</span>
                                        <span className="opacity-75">92% Staffed</span>
                                    </div>
                                    <div className="progress rounded-pill bg-white bg-opacity-25" style={{ height: "6px" }}>
                                        <div className="progress-bar rounded-pill" role="progressbar" style={{ width: "92%", backgroundColor: "#e6ebf5" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between mb-1 small fw-bold">
                                        <span className="text-warning">Evening Shift (E)</span>
                                        <span className="text-warning">85% Staffed</span>
                                    </div>
                                    <div className="progress rounded-pill bg-white bg-opacity-25" style={{ height: "6px" }}>
                                        <div className="progress-bar rounded-pill bg-orange" role="progressbar" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between mb-1 small fw-bold">
                                        <span>Night Shift (N)</span>
                                        <span className="opacity-75">100% Staffed</span>
                                    </div>
                                    <div className="progress rounded-pill bg-white bg-opacity-25" style={{ height: "6px" }}>
                                        <div className="progress-bar rounded-pill" role="progressbar" style={{ width: "100%", backgroundColor: "#e6ebf5" }}></div>
                                    </div>
                                </div>
                            </div>

                            <button className="btn w-100 text-white border border-secondary px-4 py-3 rounded-3 mt-auto shadow-sm position-relative z-index-1 fw-bold tracking-wider small" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                                Request Coverage Rebalance
                            </button>

                            {/* Floating gradient box UI element */}
                            <div className="position-absolute" style={{ right: "-20px", bottom: "40px", width: "100px", height: "100px", backgroundColor: "#f47b2c", transform: "rotate(45deg)", borderRadius: "20px", opacity: 0.9 }}></div>
                        </div>
                    </div>

                </div>

            </div>

            <style>
                {`
                    .bg-m { background-color: #f1f4fb; }
                    .bg-e { background-color: #fcece3; }
                    .bg-n { background-color: #1e3050; }
                    .bg-wo { background-color: #e74c3c; }
                    .bg-g { background-color: #f8f9fa; }
                    .tracking-wider { letter-spacing: 1px; }
                    .z-index-1 { z-index: 1; }
                `}
            </style>
        </div>
    );
}
