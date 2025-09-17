"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card } from "primereact/card";
import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add User Sidebar
  const [showSidebar, setShowSidebar] = useState(false);

  // Edit User Sidebar
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email_id: "",
    password: "",
    role_id: "CUSTOMER",
    is_active: true,
  });

  const [saving, setSaving] = useState(false);
  const toast = useRef(null);

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: "Admin" },
    { label: "Users" },
  ];

  // Filters state
  const [filters, setFilters] = useState({
    role_id: null,
    status: null,
  });

  // Pagination + Sorting state
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
   
  });

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/users");
      const data = await res.json();

      // Normalize users to include status label
      const normalized = data.map((u) => ({
        ...u,
        status: u.is_active ? "ACTIVE" : "INACTIVE",
      }));

      setUsers(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Save user
  const saveUser = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.error || "Failed to create user",
        });
        return;
      }
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "User added successfully",
      });
      setShowSidebar(false);
      setForm({
        name: "",
        username: "",
        email_id: "",
        password: "",
        role_id: "CUSTOMER",
        is_active: true,
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update user (Edit)
  const updateUser = async () => {
    if (!selectedUser) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/v1/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.error || "Failed to update user",
        });
        return;
      }
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "User updated successfully",
      });
      setShowEditSidebar(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    } finally {
      setSaving(false);
    }
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
  const inactiveUsers = users.filter((u) => u.status === "INACTIVE").length;

  const actionBody = (row) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="info"
        onClick={() => {
          setSelectedUser(row);
          setShowEditSidebar(true);
        }}
      />
    </div>
  );

  // 🔹 Dynamic filter options
  const roleOptions = [...new Set(users.map((u) => u.role_id))].map((r) => ({
    label: r,
    value: r,
  }));
  const statusOptions = [...new Set(users.map((u) => u.status))].map((s) => ({
    label: s,
    value: s,
  }));

  const roleDropdownOptions = [
    { label: "Customer", value: "CUSTOMER" },
    { label: "Admin", value: "ADMIN" },
    { label: "hoster", value: "HOSTER" },
  ];

  const statusDropdownOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  // 🔹 Apply filters
  const filteredUsers = users.filter((u) => {
    const roleMatch =
      !filters.role_id ||
      filters.role_id.length === 0 ||
      filters.role_id.includes(u.role_id);
    const statusMatch =
      !filters.status ||
      filters.status.length === 0 ||
      filters.status.includes(u.status);
    return roleMatch && statusMatch;
  });

  return (
    <div className="p-4">
      <Toast ref={toast} />

      {/* Breadcrumb + Stats */}
      <Card className="shadow-2 mb-4">
        <div className="flex justify-between items-center mb-3">
          <BreadCrumb model={breadcrumbItems} />
          <Button
            label="Add User"
            icon="pi pi-plus"
            className="p-button-sm p-button-primary"
            onClick={() => setShowSidebar(true)}
          />
        </div>

        {/* User Stats */}
        <div className="flex gap-4 mt-3">
          <div className="p-3 bg-gray-100 rounded text-center">
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-lg font-bold">{totalUsers}</div>
          </div>
          <div className="p-3 bg-green-100 rounded text-center">
            <div className="text-sm text-gray-600">Active Users</div>
            <div className="text-lg font-bold">{activeUsers}</div>
          </div>
          <div className="p-3 bg-red-100 rounded text-center">
            <div className="text-sm text-gray-600">Inactive Users</div>
            <div className="text-lg font-bold">{inactiveUsers}</div>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card title="Users List">
        <div className="flex gap-4 mb-3">
          {/* Role Filter */}
          <MultiSelect
            value={filters.role_id}
            options={roleOptions}
            onChange={(e) => setFilters({ ...filters, role_id: e.value })}
            placeholder="Filter by Role"
            display="chip"
            className="w-60"
          />

          {/* Status Filter */}
          <MultiSelect
            value={filters.status}
            options={statusOptions}
            onChange={(e) => setFilters({ ...filters, status: e.value })}
            placeholder="Filter by Status"
            display="chip"
            className="w-60"
          />
        </div>

        <DataTable
          value={filteredUsers}
          loading={loading}
          paginator
          rows={lazyState.rows}
          first={lazyState.first}
          onPage={(e) => {console.log(e); setLazyState(e)}}
          rowsPerPageOptions={[5, 10, 20]}
          sortField={lazyState.sortField}
          sortOrder={lazyState.sortOrder}
          onSort={(e) => setLazyState(e)}
          tableStyle={{ minWidth: "40rem" }}
        >
          <Column field="username" header="Username" sortable></Column>
          <Column field="email_id" header="Email" sortable></Column>
          <Column field="role_id" header="Role" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
          <Column header="Action" body={actionBody}></Column>
        </DataTable>
      </Card>

      {/* Sidebar for Add User */}
      <Sidebar
        visible={showSidebar}
        position="right"
        onHide={() => setShowSidebar(false)}
        baseZIndex={1000}
        style={{ width: "30rem" }}
      >
        <h2 className="mb-4 text-xl font-bold">Add New User</h2>
        <div className="flex flex-col gap-3">
          <InputText
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <InputText
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <InputText
            placeholder="Email"
            value={form.email_id}
            onChange={(e) => setForm({ ...form, email_id: e.target.value })}
          />
          <Password
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            toggleMask
          />
          <Dropdown
            value={form.role_id}
            options={roleDropdownOptions}
            onChange={(e) => setForm({ ...form, role_id: e.value })}
            placeholder="Select Role"
          />
          <Button
            label={saving ? "Saving..." : "Save"}
            className="p-button-success mt-3"
            onClick={saveUser}
            disabled={saving}
          />
        </div>
      </Sidebar>

      {/* Sidebar for Edit User */}
      <Sidebar
        visible={showEditSidebar}
        position="right"
        onHide={() => setShowEditSidebar(false)}
        baseZIndex={1000}
        style={{ width: "30rem" }}
      >
        <h2 className="mb-4 text-xl font-bold">Edit User</h2>
        {selectedUser && (
          <div className="flex flex-col gap-3">
            <InputText
              placeholder="Name"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
            <InputText
              placeholder="Email"
              value={selectedUser.email_id}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email_id: e.target.value })
              }
            />
            <Dropdown
              value={selectedUser.is_active}
              options={statusDropdownOptions}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, is_active: e.value })
              }
              placeholder="Select Status"
            />
            <Button
              label={saving ? "Updating..." : "Update"}
              className="p-button-info mt-3"
              onClick={updateUser}
              disabled={saving}
            />
          </div>
        )}
      </Sidebar>
    </div>
  );
}
