import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import auth_service_obj from "./appwrite/auth";
import { logout } from "./store/auth_slice";
import { Header, Footer } from "./components/index.js";
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, set_loading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    //everytime app loads, get current user, if found, login i.e. make authenticated else unauthenticated
    auth_service_obj
      .get_current_user()
      .then((user_data) => {
        if (user_data) {
          dispatch(login(user_data));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Error getting user in App.jsx : ", error);
      })
      .finally(() => set_loading(false)); //chahye user mily ya na mily, mark loading as done(true)
  }, []);

  //conditional rendering

  return !loading ? (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <h1 className="text-4xl text-center">Inkspire!</h1>
      </div>
      <div className="w-full block">
        <Header />
        <main>
           <Outlet /> 
        </main>
        <Footer />
      </div>
    </>
  ) : null;
}

export default App;
