import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addListingApi } from "../features/dataSlice";
import { useNavigate } from "react-router-dom";

// export default function CreateAd() {
//   const { loading, userInfo, accessToken } = useSelector((state) => state.wall);
//   const { categories } = useSelector((state) => state.cabinet);
//   const dispatch = useDispatch();

//   const theme = createTheme();

//   const validationSchema = Yup.object({
//     title: Yup.string().min(5, "Must be at least 5 characters").max(55, "Must be 55 characters or less").required("Required"),
//     description: Yup.string().min(25, "Must be at least 25 characters").max(255, "Must be 255 characters or less").required("Required"),
//     price: Yup.number().integer().min(0, "Can't be less than 0 dollars").required("Required"),
//     category: Yup.string().min(3, "Must be at least 3 characters").max(55, "Must be 55 characters or less").required("Required"),
//     image: Yup.mixed(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       image: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       values.seller = userInfo.id;
//       console.log(values);
//       console.log("PATH IS", values.image.path);
//       console.log("TYPE IS", values.image.type);
//       console.log("SIZE IS", values.image.size);
//       // alert(JSON.stringify(values, null, 2));
//       // console.log("submission:", values);
//       dispatch(addListingApi({ values, accessToken }));
//     },
//   });

//   return (
//     <div id="createAdContainer">
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <Paper elevation={3}>
//             <CssBaseline />
//             <Box
//               sx={{
//                 marginTop: 6,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 padding: 5,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "flex-end" }}>
//                 <Typography component="h1" variant="h5">
//                   Post New Advert&nbsp;
//                 </Typography>
//                 <RequestPageIcon sx={{ fontSize: 37 }} />
//               </Box>
//               <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={12}>
//                     <TextField
//                       autoComplete="advert-title"
//                       name="title"
//                       required
//                       fullWidth
//                       id="title"
//                       label="Advert Title"
//                       autoFocus
//                       value={formik.values.title}
//                       onChange={formik.handleChange}
//                       error={formik.touched.title && Boolean(formik.errors.title)}
//                       helperText={formik.touched.title && formik.errors.title}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="description"
//                       label="Description"
//                       name="description"
//                       autoComplete="description"
//                       value={formik.values.description}
//                       onChange={formik.handleChange}
//                       error={formik.touched.description && Boolean(formik.errors.description)}
//                       helperText={formik.touched.description && formik.errors.description}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="price"
//                       label="Price"
//                       type="number"
//                       id="price"
//                       autoComplete="item-price"
//                       value={formik.values.price}
//                       onChange={formik.handleChange}
//                       error={formik.touched.price && Boolean(formik.errors.price)}
//                       helperText={formik.touched.price && formik.errors.price}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControl sx={{ minWidth: "100%" }}>
//                       <InputLabel id="demo-simple-select-helper-label">Category *</InputLabel>
//                       <Select
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         label="Category"
//                         name="category"
//                         value={formik.values.category}
//                         error={formik.touched.category && Boolean(formik.errors.category)}
//                         helpertext={formik.touched.category && formik.errors.category}
//                         onChange={formik.handleChange}
//                         uncontrolled="true"
//                       >
//                         <MenuItem value="">
//                           <em>Category</em>
//                         </MenuItem>
//                         {categories
//                           ? categories.map((ele, idx) => (
//                               <MenuItem key={`categoryCreate${idx}`} value={ele._id}>
//                                 {ele.name}
//                               </MenuItem>
//                             ))
//                           : null}
//                         {/* <MenuItem value="No Category">
//                           <em>None</em>
//                         </MenuItem>
//                         <MenuItem value={"Category1"}>Category1</MenuItem>
//                         <MenuItem value={"Category2"}>Category2</MenuItem>
//                         <MenuItem value={"Category2"}>Category3</MenuItem> */}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button variant="outlined" component="label" sx={{ fontSize: "13px" }}>
//                       Upload Image
//                       <input
//                         type="file"
//                         hidden
//                         name="image"
//                         id="image"
//                         // value={formik.values.image}
//                         onChange={formik.handleChange}
//                         error={formik.touched.image && Boolean(formik.errors.image)}
//                         // helperText={formik.touched.image && formik.errors.image}
//                       />
//                     </Button>
//                   </Grid>
//                 </Grid>
//                 <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
//                   Post Ad
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>
//       </ThemeProvider>
//     </div>
//   );
// }

export default function CreateAd() {
  const { userInfo, accessToken } = useSelector((state) => state.wall);
  const { loading, categories } = useSelector((state) => state.cabinet);
  const [cat, setCat] = useState("");
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const theme = createTheme();
  const [hide, setHide] = useState(true);

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     description: "",
  //     price: "",
  //     category: "",
  //     image: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     values.seller = userInfo.id;
  //     console.log(values);
  //     console.log("PATH IS", values.image.path);
  //     console.log("TYPE IS", values.image.type);
  //     console.log("SIZE IS", values.image.size);
  //     // alert(JSON.stringify(values, null, 2));
  //     // console.log("submission:", values);
  //     dispatch(addListingApi({ values, accessToken }));
  //   },
  // });

  return (
    <div id="createAdContainer">
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().min(5, "Must be at least 5 characters").max(55, "Must be 55 characters or less").required("Required"),
          description: Yup.string().min(5, "Must be at least 25 characters").max(255, "Must be 255 characters or less").required("Required"),
          price: Yup.number().integer().min(0, "Can't be less than 0 dollars").required("Required"),
          category: Yup.string().required("Required"),
          image: Yup.mixed(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          values.seller = userInfo.id;
          console.log(values);
          console.log("TYPE IS", values.image.type);
          console.log("SIZE IS", values.image.size);
          // alert(JSON.stringify(values, null, 2));
          // console.log("submission:", values);
          resetForm();
          dispatch(addListingApi({ values, accessToken }));
          setTimeout(() => {
            goTo("/");
            setSubmitting(false);
          }, 3000);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3}>
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Typography component="h1" variant="h5">
                      Post New Advert&nbsp;
                    </Typography>
                    <RequestPageIcon sx={{ fontSize: 37 }} />
                  </Box>
                  <Form>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            autoComplete="advert-title"
                            component="field"
                            name="title"
                            required
                            fullWidth
                            id="title"
                            label="Advert Title"
                            autoFocus
                            // value={formik.values.title}
                            // onChange={formik.handleChange}
                            // error={formik.touched.title && Boolean(formik.errors.title)}
                            // helperText={formik.touched.title && formik.errors.title}
                            onChange={(e) => {
                              console.log("TITLEVALUE", e.target.value);
                              setFieldValue("title", e.target.value);
                            }}
                          />
                          <ErrorMessage className="errorMsg" name="title" component="div" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            // value={formik.values.description}
                            // onChange={formik.handleChange}
                            // error={formik.touched.description && Boolean(formik.errors.description)}
                            // helperText={formik.touched.description && formik.errors.description}
                            onChange={(e) => {
                              console.log("DESCRIPTIONVALUE", e.target.value);
                              setFieldValue("description", e.target.value);
                            }}
                          />
                          <ErrorMessage className="errorMsg" name="description" component="div" />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            type="number"
                            id="price"
                            autoComplete="item-price"
                            // value={formik.values.price}
                            // onChange={formik.handleChange}
                            // error={formik.touched.price && Boolean(formik.errors.price)}
                            // helperText={formik.touched.price && formik.errors.price}
                            onChange={(e) => {
                              console.log("PRICEVALUE", e.target.value);
                              setFieldValue("price", e.target.value);
                            }}
                          />
                          <ErrorMessage className="errorMsg" name="price" component="div" />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl sx={{ minWidth: "100%" }}>
                            <InputLabel id="demo-simple-select-helper-label">Category *</InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              label="Category"
                              name="category"
                              value={cat}
                              // error={formik.touched.category && Boolean(formik.errors.category)}
                              // helpertext={formik.touched.category && formik.errors.category}
                              onChange={(e) => {
                                console.log("CATEGORYVALUE", e.target.value);
                                setCat(e.target.value);
                                setFieldValue("category", e.target.value);
                              }}
                              uncontrolled="false"
                            >
                              <MenuItem value="">
                                <em>Category</em>
                              </MenuItem>
                              {categories
                                ? Object.values(categories).map((ele, idx) => (
                                    <MenuItem key={`categoryCreate${idx}`} value={ele._id}>
                                      {ele.name}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>
                            <ErrorMessage className="errorMsg" name="category" component="div" />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="outlined" component="label" sx={{ fontSize: "13px" }}>
                            <div
                              style={{ color: "#3a80cf", textAlign: hide ? "left" : "center", position: hide ? "static" : "relative", right: "7px" }}
                            >
                              Upload Image
                            </div>
                            <input
                              type="file"
                              hidden={hide}
                              name="image"
                              id="image"
                              onChange={(e) => {
                                console.log("FILEVALUE:", e.currentTarget.files);
                                hide ? setHide(false) : setHide(true);
                                setFieldValue("image", e.currentTarget.files[0]);
                              }}
                            />
                          </Button>
                        </Grid>
                      </Grid>
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading || isSubmitting}>
                        Post Ad
                      </Button>
                    </Box>
                  </Form>
                </Box>
              </Paper>
            </Container>
          </ThemeProvider>
        )}
      </Formik>
    </div>
  );
}
