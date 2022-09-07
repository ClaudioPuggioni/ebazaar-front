import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyListings } from "../features/dataSlice";
import AdCard from "./AdCard";

export default function MyListings() {
  const { userInfo } = useSelector((state) => state.wall);
  const { myListings } = useSelector((state) => state.cabinet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyListings(userInfo.id));
    // eslint-disable-next-line
  }, []);

  return (
    <div id="listingContainer" style={{ marginTop: "10px" }}>
      <Container>
        <Grid container spacing={3} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Grid item xs={8}>
            {myListings.length > 0 ? myListings.map((ele, idx) => <AdCard key={`adCard${idx}`} props={ele} removeable={true} />) : null}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
