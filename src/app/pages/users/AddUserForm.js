"use client";

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: null,
  });

  const roles = [
    { label: "Admin", value: "ADMIN" },
    { label: "Hoster", value: "HOSTER" },
    { label: "Customer", value: "CUSTOMER" },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert(`User ${formData.name} added successfully!`);
  };

  return (
    <div className="p-fluid">
      <h3 className="mb-4">Add User</h3>

      <div className="field">
        <InputText
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="field">
        <InputText
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="field">
        <Password
          placeholder="Password"
          feedback={false}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>

      <div className="field">
        <Dropdown
          value={formData.role}
          options={roles}
          onChange={(e) => handleChange("role", e.value)}
          placeholder="Role"
        />
      </div>

      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-primary w-full mt-3"
        onClick={handleSubmit}
      />
    </div>
  );
}
