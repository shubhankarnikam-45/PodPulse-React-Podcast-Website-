import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";
import Header from "../../common/Header";
import "./styles.css"
function LoginFormAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log("Handling Login");
        setLoading(true);
        if (email == process.env.REACT_APP_USERNAME1 && password == process.env.REACT_APP_PASSWORD1 ||
            email == process.env.REACT_APP_USERNAME2 && password == process.env.REACT_APP_PASSWORD2
        ) {
            console.log("admin")
            navigate("/admin");
        } else {
            toast.error("Make sure email and password are not empty");
            setLoading(false);
        }
    };
    return (
        <div className="parent-div-admin-login">
            <Header />
            <h1>Admin Login</h1>


            <InputComponent
                state={email}
                setState={setEmail}
                placeholder="Email"
                type="text"
                required={true}
            />
            <InputComponent
                state={password}
                setState={setPassword}
                placeholder="Password"
                type="password"
                required={true}
            />

            <Button
                className="btn"
                text={loading ? "Loading..." : "Login"}
                onClick={handleLogin}
                disabled={loading}


            />
        </div>

    );
}

export default LoginFormAdmin;
