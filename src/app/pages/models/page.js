'use client';
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export default function ModelsPage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sidebar state
  const [showSidebar, setShowSidebar] = useState(false);
  const [newModel, setNewModel] = useState({
    name: '',
    brand: '',
    image: '',
    status: 'Active',
  });

  // ✅ Fetch models
  async function fetchModels() {
    try {
      const res = await fetch('/api/v1/models');
      const data = await res.json();
      setModels(data);
    } catch (err) {
      console.error('Fetch models error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchModels();
  }, []);

  // ✅ Add model
  async function handleAddModel(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModel),
      });
      if (!res.ok) throw new Error('Failed to add model');
      await res.json();
      setShowSidebar(false);
      setNewModel({ name: '', brand: '', image: '', status: 'Active' });
      fetchModels();
    } catch (err) {
      console.error('Add model error:', err);
    }
  }

  // Helpers
  const imageBody = (row) => <img src={row.image} alt={row.name} width="40" />;
  const activeBody = (row) => <span>{row.status === 'Active' ? 'Yes' : 'No'}</span>;

  // Counts
  const activeCount = models.filter((m) => m.status === 'Active').length;
  const inactiveCount = models.filter((m) => m.status === 'Inactive').length;
  const totalCount = models.length;

  // Breadcrumb
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Admin' },
    { label: 'Models' },
  ];

  return (
    <div className="p-4">
      <Card className="shadow-2 mb-4">
        <div className="flex justify-between items-center mb-3">
          <BreadCrumb model={breadcrumbItems} />
          <Button
            label="Add Model"
            icon="pi pi-plus"
            className="p-button-sm p-button-primary"
            onClick={() => setShowSidebar(true)}
          />
        </div>
        <div className="flex gap-5 text-sm my-3">
          <span className="flex items-center gap-2">
            <i className="pi pi-check" /> {activeCount} Active
          </span>
          <span className="flex items-center gap-2">
            <i className="pi pi-times" /> {inactiveCount} Inactive
          </span>
          <span className="flex items-center gap-2">
            <i className="pi pi-car" /> {totalCount} Total Models
          </span>
        </div>
      </Card>

      <Card title="Model List">
        <DataTable value={models} paginator rows={5} loading={loading} tableStyle={{ minWidth: '10rem' }}>
          <Column header="Image" body={imageBody}></Column>
          <Column field="name" header="Model Name"></Column>
          <Column field="brand" header="Brand"></Column>
          <Column header="Active" body={activeBody}></Column>
        </DataTable>
      </Card>

      {/* ✅ Add Model Sidebar */}
      <Sidebar visible={showSidebar} position="right" onHide={() => setShowSidebar(false)} className="p-4 w-96">
        <h3>Add Model</h3>
        <form onSubmit={handleAddModel} className="flex flex-col gap-3 mt-3">
          <InputText
            placeholder="Model Name"
            value={newModel.name}
            onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
          />
          <InputText
            placeholder="Brand"
            value={newModel.brand}
            onChange={(e) => setNewModel({ ...newModel, brand: e.target.value })}
          />
          <InputText
            placeholder="Image URL"
            value={newModel.image}
            onChange={(e) => setNewModel({ ...newModel, image: e.target.value })}
          />
          <Dropdown
            value={newModel.status}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ]}
            onChange={(e) => setNewModel({ ...newModel, status: e.value })}
          />
          <Button type="submit" label="Save" />
        </form>
      </Sidebar>
    </div>
  );
}
