import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";

function AdminLayout() {
  return (
    <>
      <HeaderAdmin />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
