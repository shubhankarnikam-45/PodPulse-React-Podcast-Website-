import React, { useEffect, useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
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
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    console.log("data", data)

    //here we get the all podcast data to show the 'filter output'
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "admin")),
            (querySnapshot) => {
                const userData = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    userData.push({ id: doc.id, ...doc.data() });
                });
                setData(userData);

            },
            (error) => {
                console.error("Error fetching podcasts:", error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogin = async () => {
        console.log("Handling Login");
        setLoading(true);
        if (data[0].id == email && data[0].password == password || data[1].id == email && data[1].password == password) {
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
