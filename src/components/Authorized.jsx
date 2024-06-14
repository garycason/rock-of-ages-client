//Authorized.jsx
//import { Navigate, Outlet } from "react-router-dom"
//import { NavBar } from "./Navbar.jsx"

//export const Authorized = () => {
  //if (localStorage.getItem("rock_token")) {
    //return <>
      //<NavBar />
      //<main className="p-4">
        //<Outlet />
      //</main>
    //</>
  //}
  //return <Navigate to='/login' replace />
//}


import { Outlet } from "react-router-dom";
import { NavBar } from "./Navbar.jsx";

export const Authorized = () => {
  return (
    <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};
