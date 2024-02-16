

import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Logout = () => {

    function fun() {

        signOut(auth)
            .then(() => {
                toast.success("User Logged Out!");
            })
            .catch((error) => {
                // An error happened.
                toast.error(error.message);
            });

    }
    fun();
    return (
        <div>

        </div>
    )
}

export default Logout