"use client";

import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
import { LayoutProps } from "./types";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/configureStore";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <div className="flex">
        <Sidebar />
        <div className="w-full pd-container overflow-auto relative">
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default Layout;
