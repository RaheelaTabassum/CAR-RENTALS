"use client";

import React, { useState } from "react";
import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import AddUserForm from "./AddUserForm";

export default function UserTable({ users }) {
  const [visible, setVisible] = useState(false);

  const home = { icon: "pi pi-home", url: "/pages/dashboard" };
  const items = [{ label: "Admin" }, { label: "Users" }];

  return (
    <div className="card p-2">
      <Card className="shadow-2 p-0">
        {/* Breadcrumb */}
        <BreadCrumb model={items} home={home} />

        {/* Header with Add User button */}
        <div className="flex justify-content-between align-items-center my-4">
          <div className="flex flex-column">
            <h2 className="mb-0">Users</h2>
            <div className="flex gap-5 text-sm text-500">
              <span className="pi pi-check text-green-500"> 33 Active </span>
              <span className="pi pi-times text-red-500"> 23 Inactive </span>
              <span className="pi pi-users text-blue-500"> 56 Total Users </span>
            </div>
          </div>
          <Button
            label="Add User"
            icon="pi pi-plus"
            className="p-button-sm p-button-primary"
            onClick={() => setVisible(true)}
          />
        </div>
      </Card>

      {/* Users Table */}
      <DataTable
        value={users}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        tableStyle={{ minWidth: "10rem" }}
      >
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="role" header="Role" />
      </DataTable>

      {/* Right-side Add User Form */}
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        style={{ width: "50rem" }}
      >
        <AddUserForm />
      </Sidebar>
    </div>
  );
}
