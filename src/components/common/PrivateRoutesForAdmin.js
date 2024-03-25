import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const PrivateRoutesForAdmin = () => {
  const adminState = useSelector((state) => state.admin.adminState);

  console.log("democ", adminState)
  if (adminState == false) {
    return <Navigate to="/" replace />;
  } else if (adminState == true) {
    return <Outlet />;
  }
};

export default PrivateRoutesForAdmin;
