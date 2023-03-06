import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";


const Mainlayout = () => (
  <Container style={{ minHeight: window.innerHeight }}>
    {/* @ts-ignore */}
    <Header />
    <Outlet />
  </Container>
);

export default Mainlayout;
