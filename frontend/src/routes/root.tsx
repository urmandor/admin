import { Container } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <React.Fragment>
      <NavBar pages={[]} />
      <Container style={{ marginTop: 20, marginBottom: 20 }}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
}
