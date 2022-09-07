import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../features/dataSlice";
import CreateAd from "./CreateAd";
import Listings from "./Listings";
import Login from "./Login";
import MyListings from "./MyListings";
import SignUp from "./SignUp";
import SingleAd from "./SingleAd";
import UserInterface from "./UserInterface";

export default function Main() {
  const { lgn, accessToken } = useSelector((state) => state.wall);
  const goTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("lgn toggled; accessToken:", accessToken);
    if (accessToken) dispatch(getCategoriesApi(accessToken));
    !lgn ? goTo("/login") : goTo("/");
    // eslint-disable-next-line
  }, [lgn]);

  return (
    <div id="mainContainer">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<UserInterface />}>
          <Route index element={<Listings />} />
          <Route path="/createad" element={<CreateAd />} />
          <Route path="/singlead/:id" element={<SingleAd />} />
          <Route path="/mylistings" element={<MyListings />} />
        </Route>
      </Routes>
    </div>
  );
}
