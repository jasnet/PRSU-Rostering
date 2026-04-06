import React, { useEffect, useState } from 'react'


export default function Schedule() {

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const d = new Date();

  const timeout = setTimeout(() => {
    setDate(d.toLocaleDateString());
    setTime(d.toLocaleTimeString());
  }, 1000);

  useEffect(() => {



  })


  return (
        <div className="bg-light pb-5" style={{ minHeight: "calc(100vh - 70px)" }}>
            <div className="container pt-5">
                <div className="row mb-4">
                    <div className="col-12">
                        <p className="text-warning fw-bold small mb-1 tracking-wider">EMPLOYEE PORTAL</p>
                        <h1 className="fw-bolder text-navy mb-3 display-5" style={{ color: "#1e3050", fontWeight: "800" }}>Your Schedule</h1>
                        <div className="d-flex align-items-center gap-4 mt-3">
                            <div className="d-flex align-items-center gap-2">
                                <i className="far fa-calendar-alt text-orange fs-5"></i>
                                <span className="fw-bold text-navy">{date}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="far fa-clock text-orange fs-5"></i>
                                <span className="fw-bold text-navy">{time}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4 mt-4">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
                            <h4 className="fw-bold text-navy m-0">Weekly Assignments</h4>
                            <span className="badge bg-blue-soft text-navy px-3 py-2 rounded-pill fs-6 border">Current Week</span>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {/* Monday */}
                            <div className="row align-items-center bg-white border rounded-4 p-3 shadow-sm transition-all hover-translate-y">
                                <div className="col-md-2 border-end">
                                    <div className="bg-orange-soft text-orange fw-bold text-center rounded-3 py-3 px-2">
                                        <h5 className="m-0 text-uppercase tracking-wider small fw-bolder">Monday</h5>
                                    </div>
                                </div>
                                <div className="col-md-4 ps-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-blue-soft d-flex justify-content-center align-items-center text-navy" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-heartbeat"></i>
                                        </div>
                                        <h5 className="m-0 fw-bold text-navy">Intensive Care Unit</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 ms-auto text-end">
                                    <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">08:00 - 16:00</span>
                                </div>
                            </div>

                            {/* Tuesday */}
                            <div className="row align-items-center bg-white border rounded-4 p-3 shadow-sm transition-all hover-translate-y">
                                <div className="col-md-2 border-end">
                                    <div className="bg-light text-secondary fw-bold text-center rounded-3 py-3 px-2">
                                        <h5 className="m-0 text-uppercase tracking-wider small fw-bolder">Tuesday</h5>
                                    </div>
                                </div>
                                <div className="col-md-4 ps-4">
                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle bg-blue-soft d-flex justify-content-center align-items-center text-navy" style={{ width: '40px', height: '40px' }}>
                                                <i className="fas fa-x-ray"></i>
                                            </div>
                                            <h5 className="m-0 fw-bold text-navy">Radiology Room</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 ps-4 border-start">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-orange-soft d-flex justify-content-center align-items-center text-orange" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-procedures"></i>
                                        </div>
                                        <h5 className="m-0 fw-bold text-navy">Operating Room</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Wednesday */}
                            <div className="row align-items-center bg-white border rounded-4 p-3 shadow-sm transition-all hover-translate-y">
                                <div className="col-md-2 border-end">
                                    <div className="bg-light text-secondary fw-bold text-center rounded-3 py-3 px-2">
                                        <h5 className="m-0 text-uppercase tracking-wider small fw-bolder">Wednesday</h5>
                                    </div>
                                </div>
                                <div className="col-md-4 ps-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-blue-soft d-flex justify-content-center align-items-center text-navy" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-x-ray"></i>
                                        </div>
                                        <h5 className="m-0 fw-bold text-navy">Radiology Room</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 ms-auto text-end">
                                    <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">08:00 - 16:00</span>
                                </div>
                            </div>

                            {/* Thursday */}
                            <div className="row align-items-center bg-white border rounded-4 p-3 shadow-sm transition-all hover-translate-y">
                                <div className="col-md-2 border-end">
                                    <div className="bg-light text-secondary fw-bold text-center rounded-3 py-3 px-2">
                                        <h5 className="m-0 text-uppercase tracking-wider small fw-bolder">Thursday</h5>
                                    </div>
                                </div>
                                <div className="col-md-4 ps-4 ms-auto">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-orange-soft d-flex justify-content-center align-items-center text-orange" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-procedures"></i>
                                        </div>
                                        <h5 className="m-0 fw-bold text-navy">Operating Room</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Friday */}
                            <div className="row align-items-center bg-white border rounded-4 p-3 shadow-sm transition-all hover-translate-y">
                                <div className="col-md-2 border-end">
                                    <div className="bg-light text-secondary fw-bold text-center rounded-3 py-3 px-2">
                                        <h5 className="m-0 text-uppercase tracking-wider small fw-bolder">Friday</h5>
                                    </div>
                                </div>
                                <div className="col-md-4 ps-4 ms-auto">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-blue-soft d-flex justify-content-center align-items-center text-navy" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-x-ray"></i>
                                        </div>
                                        <h5 className="m-0 fw-bold text-navy">Radiology Room</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
