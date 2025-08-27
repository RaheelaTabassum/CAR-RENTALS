"use client"; 
import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export default function Navbar() {
  const items = [
    { label: "Home", icon: "pi pi-home", url: "/" },
    { label: "Admin", icon: "pi pi-car", url: "/cars" },
    {label:"Inventory", icon:"pi pi-list", url:"/inventory"},
    { label: "Bookings", icon: "pi pi-calendar", url: "/bookings" },
    {label:'Hosters', icon:'pi pi-users', url:'/hosters'},
    {label:'Customers', icon:'pi pi-user', url:'/customers'},
    {label:'Reports', icon:'pi pi-file', url:'/reports'},
    { label: "support", icon: "pi pi-chart-line", url: "support" },
    {label:"Logout", icon:"pi pi-sign-out", url:"/logout"}
  ];



  return <Menubar model={items}  />;
}
