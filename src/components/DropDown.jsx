import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
// import { makeStyles, Theme, createStyles } from "@mui/material/core";

export default function DropDown({ setCategory }) {
  const [choice, setChoice] = useState("");
  const { categories } = useSelector((state) => state.cabinet);

  const handleChange = (event) => {
    setChoice(event.target.value);
    event.target.value.length !== 0 && categories[event.target.value].ads
      ? setCategory(Object.values(categories[event.target.value].ads))
      : setCategory(false);
  };

  //   const useStyles = makeStyles((theme: Theme) => ({
  //     button: {
  //       display: "block",
  //       marginTop: theme.spacing(2),
  //     },
  //     formControl: {
  //       margin: theme.spacing(1),
  //       minWidth: 120,
  //       "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
  //         borderColor: "blue",
  //       },
  //     },
  //     select: {
  //       "&:before": {
  //         borderColor: "red",
  //       },
  //     },
  //   }));
  return (
    <FormControl sx={{ m: 2, minWidth: 170 }}>
      <InputLabel id="demo-simple-select-helper-label" style={{ color: "#29C5DD" }}>
        All Categories
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={choice}
        label="Category"
        onChange={handleChange}
        uncontrolled="true"
        // className={{ "&:before": { borderColor: "#29C5DD !important" }, "&:after": { borderColor: "#29C5DD !important" } }}
        classes={{ icon: { color: "#29C5DD" } }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {categories
          ? Object.values(categories).map((ele, idx) => (
              <MenuItem key={`category${idx}`} value={ele._id}>
                {ele.name}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
}
