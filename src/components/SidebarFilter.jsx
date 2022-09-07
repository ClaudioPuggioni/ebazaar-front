import React from "react";
import { Divider, Paper, Typography } from "@mui/material";
import DropDown from "./DropDown";

export default function SidebarFilter({ setCategory }) {
  return (
    <Paper elevation={1} square style={{ background: "#5073ba" }}>
      <Typography
        variant="h6"
        paddingX={2.2}
        paddingY={1.5}
        style={{ color: "white", fontSize: "16px", fontWeight: 600, textTransform: "Uppercase" }}
      >
        Category Filters
      </Typography>
      <Divider style={{ borderColor: "#229DB0" }} />
      <DropDown setCategory={setCategory} />
    </Paper>
  );
}
