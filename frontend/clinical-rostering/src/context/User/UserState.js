import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

export default function UserState(props) {

    const [userData, setUserData] = useState(null);

    // -----------------------------------
    // LOAD USER FROM SESSION
    // -----------------------------------
    useEffect(() => {

        const storedUser = sessionStorage.getItem('user');

        if (storedUser) {

            setUserData(
                JSON.parse(storedUser)
            );

        }

    }, []);

    // -----------------------------------
    // SET USER
    // -----------------------------------
    const handleSetUserData = (data) => {

        setUserData(data);

        sessionStorage.setItem(
            'user',
            JSON.stringify(data)
        );

    };

    // -----------------------------------
    // LOGOUT
    // -----------------------------------
    const logoutUser = () => {

        sessionStorage.removeItem('user');

        setUserData(null);

    };

    return (

        <UserContext.Provider

            value={{

                handleSetUserData,

                logoutUser,

                userData

            }}

        >

            {props.children}

        </UserContext.Provider>

    );

}