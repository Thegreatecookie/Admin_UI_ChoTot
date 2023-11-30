import { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export function Template() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <Sidebar isSidebar={isSidebar} />
    </>
  );
}
