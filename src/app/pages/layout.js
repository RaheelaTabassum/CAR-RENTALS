"use client"; 
import React from "react";
import { Menubar } from "primereact/menubar";


export default function PagesLayout({children}) {
  const items = [
    { label: "Home", icon: "pi pi-home", url: "/pages/dashboard" },
    { label: "Admin", icon: "pi pi-car",
        items:[{label:"Users", icon:"pi pi-users", url:"/pages/users"},
            {label:"Brands", icon:"pi pi-car",url:"/pages/brands"},
            {label:"Models", icon:"pi pi-car",url:"/pages/models"},
            {label:"variants",icon:"pi-pi-car",url:"/pages/variants"},
            {label:"States",icon:"pi-pi-car",   url:"/pages/states"},
            {label:"Cities",icon:"pi-pi-car",   url:"/pages/cities"},
            {label:"Checklist Categories",icon:"pi-pi-list",url:"/pages/checklist-categories"},
            {label:"Checklist Options",icon:"pi-pi-list",   url:"/pages/checklist-option"},
            {label:"Settings",icon:"pi-pi-settings",   url:"/pages/settings"},
        ]
    },
    {label:"Inventory", icon:"pi pi-list",
        items:[{label:"Pending Vehciles",icon:"pi-pi-car",url:"/pages/pending-vehicles"},
            {label:"Available Vehciles",icon:"pi-pi-car",url:"/pages/available-vehicles"},

        ]
    },
    { label:"Bookings", icon: "pi pi-calendar", url: "/bookings" },
    {label:'Hosters', icon:'pi pi-users', url:'/hosters'},
    {label:'Customers', icon:'pi pi-user', url:'/customers'},
    {label:'Billings',icon:'pi-pi-user',
        items:[{label:"invoices",icon:"pi-pi-car",url:"pages/invoices"},
            {label:"payment History",icon:"pi-pi-car",url:"/pages/payment-history"}
        ]
    },

    {label:'Reports', icon:'pi pi-file', url:'/reports'},
    { label:"Support", icon: "pi pi-chart-line", url: "support" },
    {label:"Logout", icon:"pi pi-sign-out", url:"/logout"}
  ];



  return (
  <div>
  <Menubar model={items}  />
  <div>{children}</div>
    </div>

  );
}
