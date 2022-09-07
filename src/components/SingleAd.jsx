import { Box, Container, Paper, Typography, Chip, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import ImgModal from "./ImgModal";

export default function SingleAd() {
  const { adSingles, categories } = useSelector((state) => state.cabinet);
  const { id } = useParams();

  useEffect(() => {
    console.log();
  }, []);

  return (
    <Container sx={{ height: "auto", display: "flex", alignItems: "center" }}>
      {adSingles[id] ? (
        <Paper sx={{ position: "relative", marginTop: "25px", padding: "25px 35px", height: "auto", flex: "1" }} elevation={5}>
          <Box>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography component={"h1"} variant={"h6"} sx={{ fontSize: "25px" }}>
                    {adSingles[id].title}
                  </Typography>
                  <Stack display={"flex"} flexDirection={"row"} marginX={1.5} gap={1}>
                    <Chip label={categories[adSingles[id].category].name} sx={{ fontWeight: 400 }} />
                  </Stack>
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={1} marginY={1}>
                  <Typography>List Date: {new Date(adSingles[id].created_at).toDateString().split(" ").slice(1).join(", ")}</Typography>
                  <Typography>Seller: {adSingles[id].seller.username}</Typography>
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"} gap={1.5}>
                <Typography sx={{ fontSize: "18px" }}>Item price: ${adSingles[id].price}</Typography>
                <Typography>
                  {adSingles[id].interested_buyers.length === 0
                    ? "No current buyers"
                    : `Interested Buyers: ${adSingles[id].interested_buyers.length}`}
                </Typography>
              </Box>
            </Box>
            <Box marginY={3}>
              <Typography>{adSingles[id].description}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              py: 1,
              overflow: "auto",
              width: 343,
              scrollSnapType: "x mandatory",
              "& > *": {
                scrollSnapAlign: "center",
              },
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            {Array.isArray(adSingles[id].imageUrldata) ? (
              adSingles[id].imageUrldata.map((item) => (
                <Card
                  row
                  key={item.title}
                  variant="outlined"
                  sx={{
                    gap: 2,
                    "--Card-padding": (theme) => theme.spacing(2),
                  }}
                >
                  <AspectRatio sx={{ borderRadius: "sm", overflow: "auto" }}>
                    <ImgModal src={`${adSingles[id].imageUrl}?h=120&fit=crop&auto=format`} />
                  </AspectRatio>
                  <Box sx={{ whiteSpace: "nowrap" }}>
                    <Typography fontWeight="md">{item.title}</Typography>
                    <Typography level="body2">{item.description}</Typography>
                  </Box>
                </Card>
              ))
            ) : (
              <AspectRatio sx={{ borderRadius: "sm", overflow: "auto" }}>
                <ImgModal src={`${adSingles[id].imageUrl}?h=120&fit=crop&auto=format`} />
              </AspectRatio>
            )}
          </Box>

          {/* <Box sx={{ position: "absolute", bottom: "30px", left: "30px" }}>
            <img className="singleImg" src={adSingles[id].imageUrl} alt="single thumb" width={250} />
          </Box> */}
        </Paper>
      ) : null}
    </Container>
  );
}
