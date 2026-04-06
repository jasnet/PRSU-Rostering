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

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import LoggedOut from './components/LoggedOut';
import UserState from './context/User/UserState';

function App() {

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setUserLoggedIn(true);
        }
    })

    return (
        <>
            {/* Insert componenets */}


            <BrowserRouter>
                <UserState>
                    <Navbar />
                    <div className="d-flex" style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: '#f8f9fc' }}>
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                        <div className="main-content flex-grow-1" style={{ marginLeft: isSidebarOpen ? '260px' : '80px', transition: 'margin-left 0.3s ease-in-out' }}>
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route exact path="/nurses" element={<Roster type="Nurses" />} />
                                <Route exact path="/doctors" element={<Roster type="Doctors" />} />
                                <Route exact path="/speciality-clinics" element={<SpecialityClinic />} />
                                <Route exact path="/schedule" element={<Schedule />} />
                                <Route exact path="/admin" element={<Admin />} />
                                <Route exact path="/admin2" element={<Admin2 />} />
                                <Route exact path="/leave-request" element={<LeaveRequest />} />
                                <Route exact path="/profile" element={<Profile />} />
                                <Route exact path='/logged-out' element={<LoggedOut />} />
                            </Routes>
                            <Footer />
                        </div>
                    </div>
                </UserState>
            </BrowserRouter>

        </>
    );
}

export default App;
