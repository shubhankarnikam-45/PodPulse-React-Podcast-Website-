import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateAPodcastPage from "./pages/CreateAPodcast";
import PodcastsPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateAnEpisodePage from "./pages/CreateAnEpisode";
import HomePage from "./pages/HomePage";
import Logout from "./pages/Logout";
import AdminPage from "./pages/AdminPage";
import LoginFormAdmin from "./components/SignupComponents/LoginFormAdmin/LoginFormAdmin";
import PrivateRoutesForAdmin from "./components/common/PrivateRoutesForAdmin";


function App() {

  //redux dispatch().
  const dispatch = useDispatch();

  

  //here we use the 'useEffect()' because when user not logout .
  //then state is  must be preserved.
  //here we used the 'onAuthStateChanged'.
  //'onSnapshoot()'
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign" element={<SignUpPage />} />
          <Route path="/adminlogin" element={<LoginFormAdmin />} />

          {/* <Route path="/admin/main" element={< />} / > */}
          {/* below all are private routes this are accisible only when user is login. */}
          < Route element={<PrivateRoutes />}>
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/create-a-podcast" element={<CreateAPodcastPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisodePage />}
            />
          </Route>
          < Route element={<PrivateRoutesForAdmin />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
