import { Grid, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesApi, getListingsApi } from "../features/dataSlice";
import AdCard from "./AdCard";
import SidebarFilter from "./SidebarFilter";

export default function Listings() {
  const { accessToken } = useSelector((state) => state.wall);
  const { listings } = useSelector((state) => state.cabinet);
  const [category, setCategory] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesApi(accessToken));
    dispatch(getListingsApi(accessToken));
    // eslint-disable-next-line
  }, []);

  return (
    <div id="listingContainer" style={{ marginTop: "10px" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {!category
              ? listings.map((ele, idx) => <AdCard key={`adCard${idx}`} props={ele} />)
              : category.map((ele, idx) => <AdCard key={`adCard${idx}`} props={ele} />)}
          </Grid>
          <Grid item xs={3} marginY={2}>
            <SidebarFilter setCategory={setCategory} />
          </Grid>
        </Grid>
      </Container>
    </div>
  ); // removeable={false}
}
