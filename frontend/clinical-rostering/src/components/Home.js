import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {

    const user = JSON.parse(
        sessionStorage.getItem('user')
    );

    const role = user?.e_type;

    // -----------------------------------
    // ADMIN
    // -----------------------------------
    if (role === "Admin") {

        return <Navigate to="/admin" />;

    }

    // -----------------------------------
    // NURSE
    // -----------------------------------
    if (role === "Nurse") {

        return <Navigate to="/nurse" />;

    }

    // -----------------------------------
    // DOCTOR
    // -----------------------------------
    if (role === "Doctor") {

        return <Navigate to="/doctor" />;

    }

    // -----------------------------------
    // FRONTDESK
    // -----------------------------------
    if (role === "FrontDesk") {

        return <Navigate to="/frontdesk" />;

    }

    return <Navigate to="/login" />;

}