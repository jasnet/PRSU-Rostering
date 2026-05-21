import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Register from './components/RegisterUser';
import Login from './components/Login';

import AdminDashboard from './components/admin/AdminDashboard';

import NurseDashboard from './components/nurse/NurseDashboard';

import MonthlyRoster from './components/nurse/MonthlyRoster';

import DoctorDashboard from './components/doctor/DoctorDashboard';

import WeeklySchedule from './components/doctor/WeeklySchedule';

import DepartmentStaffing from './components/frontdesk/DepartmentStaffing';

import MyRoster from './components/nurse/MyRoster';

import MySchedule from './components/doctor/MySchedule';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Profile from './components/Profile';
import { useState } from 'react';
import LoggedOut from './components/LoggedOut';
import UserState from './context/User/UserState';

function ProtectedRoute({ children }) {
    const user = sessionStorage.getItem('user');
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function App() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <BrowserRouter>
                <UserState>
                    <Routes>
                        {/* Public routes - no navbar/sidebar */}
                        <Route exact path="/login" element={
                            sessionStorage.getItem('user') ? <Navigate to="/" replace /> : <Login />
                        } />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path='/logged-out' element={<LoggedOut />} />

                        {/* Protected routes - with navbar/sidebar layout */}
                        <Route path="/*" element={
                            <ProtectedRoute>
                                <Navbar />
                                <div className="d-flex" style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#f8f9fc' }}>
                                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                                    <div className="main-content flex-grow-1" style={{ marginLeft: isSidebarOpen ? '260px' : '80px', transition: 'margin-left 0.3s ease-in-out' }}>
                                        <Routes>

                                            <Route exact path="/" element={<Home />} />

                                            <Route exact path="/profile" element={<Profile />} />


                                            {/* ----------------------------------- */}
                                            {/* ADMIN */}
                                            {/* ----------------------------------- */}

                                            <Route

                                                exact

                                                path="/admin"

                                                element={<AdminDashboard />}

                                            />

                                            <Route

                                                exact

                                                path="/nurses"

                                                element={<MonthlyRoster />}

                                            />

                                            <Route

                                                exact

                                                path="/doctors"

                                                element={<WeeklySchedule />}

                                            />

                                            <Route

                                                exact

                                                path="/staffing"

                                                element={<DepartmentStaffing />}

                                            />


                                            {/* ----------------------------------- */}
                                            {/* NURSE */}
                                            {/* ----------------------------------- */}

                                            <Route

                                                exact

                                                path="/nurse"

                                                element={<NurseDashboard />}

                                            />

                                            <Route

                                                exact

                                                path="/my-roster"

                                                element={<MyRoster />}

                                            />


                                            {/* ----------------------------------- */}
                                            {/* DOCTOR */}
                                            {/* ----------------------------------- */}

                                            <Route

                                                exact

                                                path="/doctor"

                                                element={<DoctorDashboard />}

                                            />

                                            <Route

                                                exact

                                                path="/my-schedule"

                                                element={<MySchedule />}

                                            />


                                            {/* ----------------------------------- */}
                                            {/* FRONTDESK */}
                                            {/* ----------------------------------- */}

                                            <Route

                                                exact

                                                path="/frontdesk"

                                                element={<DepartmentStaffing />}

                                            />

                                        </Routes>
                                        <Footer />
                                    </div>
                                </div>
                            </ProtectedRoute>
                        } />
                    </Routes>
                </UserState>
            </BrowserRouter>
        </>
    );
}

export default App;
