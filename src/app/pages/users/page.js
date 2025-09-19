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

  // Sidebar states
  const [showAddSidebar, setShowAddSidebar] = useState(false);
  const [showEditSidebar, setShowEditSidebar] = useState(false);

  // Form states
  const [form, setForm] = useState({
    name: "",
    username: "",
    email_id: "",
    password: "",
    role_id: "CUSTOMER",
    is_active: true,
  });

  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    username: "",
    email_id: "",
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

  // Filters
  const [filters, setFilters] = useState({ role_id: null, status: null });

  // Pagination + sorting
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

  // Save new user
  const saveUser = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "User added successfully",
      });
      setForm({
        name: "",
        username: "",
        email_id: "",
        password: "",
        role_id: "CUSTOMER",
        is_active: true,
      });
      fetchUsers();
      setShowAddSidebar(false);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  // Update user
  const updateUser = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/v1/users/${editForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "User updated successfully",
      });
      setEditForm({
        id: "",
        name: "",
        username: "",
        email_id: "",
        role_id: "CUSTOMER",
        is_active: true,
      });
      fetchUsers();
      setShowEditSidebar(false);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
  const inactiveUsers = users.filter((u) => u.status === "INACTIVE").length;

  // Dropdown options
  const roleDropdownOptions = [
    { label: "Customer", value: "CUSTOMER" },
    { label: "Admin", value: "ADMIN" },
    { label: "Hoster", value: "HOSTER" },
  ];

  const statusDropdownOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  const roleOptions = [...new Set(users.map((u) => u.role_id))].map((r) => ({
    label: r,
    value: r,
  }));
  const statusOptions = [...new Set(users.map((u) => u.status))].map((s) => ({
    label: s,
    value: s,
  }));

  // Apply filters
  const filteredUsers = users.filter((u) => {
    const roleMatch =
      !filters.role_id || filters.role_id.length === 0 || filters.role_id.includes(u.role_id);
    const statusMatch =
      !filters.status || filters.status.length === 0 || filters.status.includes(u.status);
    return roleMatch && statusMatch;
  });

  return (
    <div className="p-4">
      <Toast ref={toast} />

      {/* Breadcrumb + Stats */}
      <Card className="shadow-2 mb-4">
        <div className="flex justify-between items-center mb-3">
          <BreadCrumb model={breadcrumbItems} />

          {/* Buttons stacked on right */}
          <div className="flex flex-col gap-2">
            <Button
              label="Add User"
              icon="pi pi-plus"
              className="p-button-success"
              onClick={() => setShowAddSidebar(true)}
            />
            <Button
              label="Edit User"
              icon="pi pi-user-edit"
              className="p-button-warning"
              onClick={() => setShowEditSidebar(true)}
            />
          </div>
        </div>

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
          <MultiSelect
            value={filters.role_id}
            options={roleOptions}
            onChange={(e) => setFilters({ ...filters, role_id: e.value })}
            placeholder="Filter by Role"
            display="chip"
            className="w-60"
          />
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
          onPage={(e) => setLazyState(e)}
          rowsPerPageOptions={[5, 10, 20]}
          sortField={lazyState.sortField}
          sortOrder={lazyState.sortOrder}
          onSort={(e) => setLazyState(e)}
          tableStyle={{ minWidth: "40rem" }}
          selectionMode="single"
          selection={editForm}
          onSelectionChange={(e) => setEditForm(e.value)}
        >
          <Column field="username" header="Username" sortable />
          <Column field="email_id" header="Email" sortable />
          <Column field="role_id" header="Role" sortable />
          <Column field="status" header="Status" sortable />
        </DataTable>
      </Card>

      {/* Add User Sidebar */}
      <Sidebar
        visible={showAddSidebar}
        position="right"
        onHide={() => setShowAddSidebar(false)}
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
          <Dropdown
            value={form.is_active}
            options={statusDropdownOptions}
            onChange={(e) => setForm({ ...form, is_active: e.value })}
            placeholder="Select Status"
          />
          <Button
            label={saving ? "Saving..." : "Save"}
            className="p-button-success mt-3"
            onClick={saveUser}
            disabled={saving}
          />
        </div>
      </Sidebar>

      {/* Edit User Sidebar */}
      <Sidebar
        visible={showEditSidebar}
        position="right"
        onHide={() => setShowEditSidebar(false)}
        style={{ width: "30rem" }}
      >
        <h2 className="mb-4 text-xl font-bold">Edit User</h2>
        <div className="flex flex-col gap-3">
          <InputText
            placeholder="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
          <InputText
            placeholder="Username"
            value={editForm.username}
            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
          />
          <InputText
            placeholder="Email"
            value={editForm.email_id}
            onChange={(e) => setEditForm({ ...editForm, email_id: e.target.value })}
          />
          <Dropdown
            value={editForm.role_id}
            options={roleDropdownOptions}
            onChange={(e) => setEditForm({ ...editForm, role_id: e.value })}
            placeholder="Select Role"
          />
          <Dropdown
            value={editForm.is_active}
            options={statusDropdownOptions}
            onChange={(e) => setEditForm({ ...editForm, is_active: e.value })}
            placeholder="Select Status"
          />
          <Button
            label={saving ? "Updating..." : "Update"}
            className="p-button-warning mt-3"
            onClick={updateUser}
            disabled={saving}
          />
        </div>
      </Sidebar>
    </div>
  );
}
