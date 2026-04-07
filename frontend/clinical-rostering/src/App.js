import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Schedule from './components/Schedule';
import Admin from './components/Admin';
import Admin2 from './components/Admin2';
import LeaveRequest from './components/LeaveRequest';
import Register from './components/RegisterUser';
import Roster from './components/Roster';
import SpecialityClinic from './components/SpecialityClinic';
import Login from './components/Login';

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
                                            <Route exact path="/nurses" element={<Roster type="Nurses" />} />
                                            <Route exact path="/doctors" element={<Roster type="Doctors" />} />
                                            <Route exact path="/speciality-clinics" element={<SpecialityClinic />} />
                                            <Route exact path="/schedule" element={<Schedule />} />
                                            <Route exact path="/admin" element={<Admin />} />
                                            <Route exact path="/admin2" element={<Admin2 />} />
                                            <Route exact path="/leave-request" element={<LeaveRequest />} />
                                            <Route exact path="/profile" element={<Profile />} />
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
