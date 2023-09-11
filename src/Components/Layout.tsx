import React, { ReactNode } from "react";
import HomePage from "@/pages";
interface ParentComponentProps {
  children: ReactNode;
}
//General Layout for All pages
const Layout = ({ children }: ParentComponentProps) => {
  return <HomePage />;
};

export default Layout;
