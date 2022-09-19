import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import "./adminContainer.scss";

function AdminContainer() {
  return (
    <>
      <main>
        <Header />
        <section className="contentWrap">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default AdminContainer;
