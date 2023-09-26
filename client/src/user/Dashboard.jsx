import React from "react";
import { useAuth } from "../context/auth";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="laptop:w-full mobile:w-full h-auto">
        <div className="profile-container mt-5 flex items-center gap-4">
          <img
            src={auth.user.photo}
            alt="profile image"
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h1 className="text-4xl">{auth.user.name}</h1>
            <p className="text-sm text-gray-400 font-medium">
              {auth.user.email}
            </p>
          </div>
        </div>
        <div className="w-full mt-4 border-b-2 py-4">
          <ul className="flex gap-5 font-light [&>li]:cursor-pointer">
            <Link to="/home/dashboard">Profile</Link>
            <Link to="/home/dashboard/answer">Answer</Link>
            <Link to="/home/dashboard/question">Question</Link>
            <Link to="/home/dashboard/post">Post</Link>
            <Link to="/home/dashboard/followers">Followers</Link>
            <Link to="/home/dashboard/following">Following</Link>
            <Link to="/home/dashboard/edits">Edits</Link>
            <Link to="/home/dashboard/activity">Activity</Link>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
