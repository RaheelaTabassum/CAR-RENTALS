'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ModelsPage() {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'Models' }
    ];

    // Sample Data
    const models = [
        { id: 1, image: '/corolla.png', name: 'Corolla', brand: 'Toyota', status: 'Active' },
        { id: 2, image: '/civic.png', name: 'Civic', brand: 'Honda', status: 'Active' },
        { id: 3, image: '/mustang.png', name: 'Mustang', brand: 'Ford', status: 'Inactive' },
    ];

    // Counts
    const activeCount = models.filter(m => m.status === 'Active').length;
    const inactiveCount = models.filter(m => m.status === 'Inactive').length;
    const totalCount = models.length;

    // Helpers
    const imageBody = (row) => (
        <img src={row.image} alt={row.name} width="40" />
    );

    const activeBody = (row) => (
        <span>{row.status === 'Active' ? 'Yes' : 'No'}</span>
    );

    const actionBody = () => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text severity="info" />
        </div>
    );

    return (
                // ...existing code...
            
                <div className="p-4">
                    <Card className="shadow-2 mb-4">
                        <div className="flex justify-between items-center mb-3">
                            <BreadCrumb model={breadcrumbItems} />
                            <Button
                                label="Add Model"
                                icon="pi pi-plus"
                                className="p-button-sm p-button-primary"
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
                        <DataTable value={models} paginator rows={5} tableStyle={{ minWidth: '10rem' }}>
                            <Column header="Image" body={imageBody}></Column>
                            <Column field="name" header="Model Name"></Column>
                            <Column field="brand" header="Brand"></Column>
                            <Column header="Active" body={activeBody}></Column>
                            <Column header="Action" body={actionBody}></Column>
                        </DataTable>
                    </Card>
                </div>
            );

                }        // ...existing code...