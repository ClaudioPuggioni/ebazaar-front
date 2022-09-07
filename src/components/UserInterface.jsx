import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

export default function UserInterface() {
  const { lgn, accessToken } = useSelector((state) => state.wall);

  useEffect(() => {
    console.log("token change detected", accessToken);
  }, [accessToken]);

  return (
    <>
      {lgn ? (
        <div id="uiContainer">
          <MenuBar />
          <Outlet />
        </div>
      ) : null}
    </>
  );
}
