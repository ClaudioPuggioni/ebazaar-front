import { Box, Button, Fade, Grid, Paper, Popper, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import { buyerInterestApi, deleteAdApi, getSingleAdApi } from "../features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let timeout;
export default function AdCard({ props, removeable, handleDelete }) {
  const { userInfo } = useSelector((state) => state.wall);
  const [wished, setWished] = useState(props.interested_buyers.includes(userInfo.id) ? 2 : 0);
  const dispatch = useDispatch();
  const goTo = useNavigate();
  const { _id, seller, title, description, price, imageUrl } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (event) => {
    console.log("dingdongdaeng");
    let newPlacement = "bottom";
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    timeout = setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      dispatch(deleteAdApi({ adId: _id, userId: userInfo.id, password: e.target.value }));
      setOpen(false);
    }
  };

  return (
    <Grid item xs={12} marginY={2}>
      <Popper open={open} anchorEl={anchorEl} placement={"bottom"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ padding: "5px", backgroundColor: "#405c94" }} onMouseEnter={() => clearTimeout(timeout)} onMouseLeave={() => setOpen(false)}>
              <div style={{ color: "white" }}>Enter Password:</div>
              <input onKeyDown={(e) => handleSubmit(e)} type="password" />
            </Paper>
          </Fade>
        )}
      </Popper>
      <Paper elevation={1} square>
        <Box height={215} display={"flex"} xs={{ width: "100%" }}>
          <Box>
            <div className="cutoff" style={{ position: "relative", height: "215px", width: "383px", overflow: "hidden" }}>
              <img
                src={imageUrl}
                alt="product card"
                style={{
                  position: "absolute",
                  margin: "auto",
                  maxHeight: "215px",
                  top: "-9999px",
                  bottom: "-9999px",
                  left: "-9999px",
                  right: "-9999px",
                }}
              />
            </div>
          </Box>
          <Box padding={1} width={377} position={"relative"}>
            <Typography
              style={{
                position: "absolute",
                top: 0,
                right: "-1px",
                padding: "5px 8px",
                background: "#7CAE85",
                color: "black",
                borderBottomLeftRadius: "3px",
                fontWeight: 500,
              }}
            >
              ${price}
            </Typography>

            <Typography style={{ color: "#2978a0", fontSize: "17px", fontWeight: 500 }} marginX={2} marginY={1}>
              {title}
            </Typography>
            <Typography
              style={{
                color: "#2978a0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
              marginX={2}
            >
              {description}
            </Typography>
            {!removeable ? (
              <div
                onMouseEnter={() => (wished !== 2 ? setWished(1) : null)}
                onMouseLeave={() => (wished !== 2 ? setWished(0) : null)}
                onClick={() => {
                  if (seller != userInfo.id) {
                    console.log("SellerID:", seller);
                    console.log("UserID:", userInfo.id);
                    wished !== 2 ? setWished(2) : setWished(1);
                    dispatch(buyerInterestApi({ adId: _id, userId: userInfo.id }));
                  }
                }}
                style={{ position: "absolute", bottom: 0, left: 0, display: "flex", alignItems: "center", margin: "25px" }}
              >
                <Typography style={{ color: "#2978a0" }}>Interest:&nbsp;</Typography>
                {wished === 0 ? (
                  <FavoriteBorderOutlinedIcon
                    style={{ filter: "invert(37%) sepia(100%) saturate(323%) hue-rotate(155deg) brightness(66%) contrast(97%)" }}
                  />
                ) : wished === 1 ? (
                  <FavoriteTwoToneIcon
                    style={{ filter: "invert(37%) sepia(100%) saturate(323%) hue-rotate(155deg) brightness(66%) contrast(97%)" }}
                  />
                ) : (
                  <FavoriteIcon style={{ filter: "invert(37%) sepia(100%) saturate(323%) hue-rotate(155deg) brightness(66%) contrast(97%)" }} />
                )}
              </div>
            ) : null}
            {!removeable ? (
              <Button
                variant="outlined"
                href={""}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "20px",
                  color: "#2978a0",
                  borderColor: "#2978a0",
                  ":hover": { color: "white", backgroundColor: "#2978a0", borderColor: "transparent" },
                }}
                onClick={() => {
                  dispatch(getSingleAdApi(_id));
                  goTo(`/singlead/${_id}`);
                }}
              >
                View Details
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                href={""}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "20px",
                  border: "2px solid",
                  fontWeight: 700,
                  ":hover": { color: "white", backgroundColor: "#d23133" },
                }}
                onClick={(e) => handleClick(e)}
              >
                DELETE
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
