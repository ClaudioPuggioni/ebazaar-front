import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getCategoriesApi, getListingsApi } from "../features/dataSlice";
import MenuBar from "./MenuBar";

export default function UserInterface() {
  const { lgn, accessToken } = useSelector((state) => state.wall);
  const { listings } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("token change detected", accessToken);
    // if (accessToken) dispatch(getCategoriesApi(accessToken));
    // eslint-disable-next-line
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
