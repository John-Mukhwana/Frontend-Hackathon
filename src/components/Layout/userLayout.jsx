import Sidebar from "../userComponents/Sidebar";
import Navbar from "../userComponents/Navbar";
import { Outlet } from "react-router-dom";



const UserLayout =() =>{

    return(

    <div className="bg-lms-custom-50">
    
        <Navbar />
      
        <div className="flex ">
           <div >
           <Sidebar />
           </div>
           <div className=" lg:ml-80 p-6 overflow-y-auto lg:overflow-y-hidden w-full  ">
           <Outlet/>
           </div>
        </div>
    </div>
        

  );
}

export default UserLayout;