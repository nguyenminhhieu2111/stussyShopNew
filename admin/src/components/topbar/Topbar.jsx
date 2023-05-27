import React from "react";
import "./topbar.css";
import { NotificationsNone, Language,  ExitToApp } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/userRedux";
import { Link } from "react-router-dom";

export default function Topbar() {
  const dispatch=useDispatch()
  const handleExit=()=>{
      dispatch(userLogout())
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">StussyDashboar</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
         

          <div className="topbarIconContainer" onClick={handleExit}>
            <ExitToApp/>
          </div>
       
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
