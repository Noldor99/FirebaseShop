import React from "react";
import { Box, Typography } from "@mui/material";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1976d2", color: "#ffffff", py: 2, textAlign: "center"}}>
      <Typography variant="body1" component="div">
        © {year} All Rights Reserved
      </Typography>
    </Box>
    );
  };
 

export default Footer;

 