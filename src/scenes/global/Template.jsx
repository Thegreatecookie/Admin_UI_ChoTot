import { useState } from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";

export function Template() {
  return (
    <>
      <main className="content">
        <Header />
        <Outlet />
      </main>
    </>
  );
}
