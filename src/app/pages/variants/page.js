'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function VariantsPage() {
    // Breadcrumb
    const 
    breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'Variants' }
    ];

    // Sample Data
    const variants = [
        { id: 1, image: '/corolla-variant.png', name: 'Corolla Altis', model: 'Corolla', status: 'Active' },
        { id: 2, image: '/civic-variant.png', name: 'Civic Turbo', model: 'Civic', status: 'Active' },
        { id: 3, image: '/mustang-variant.png', name: 'Mustang GT', model: 'Mustang', status: 'Inactive' },
    ];

    // Counts
    const activeCount = variants.filter(v => v.status === 'Active').length;
    const inactiveCount = variants.filter(v => v.status === 'Inactive').length;
    const totalCount = variants.length;

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
        <div className="p-4">
            <Card className="shadow-2 mb-4">
                <div className="flex justify-between items-center mb-3">
                    <BreadCrumb model={breadcrumbItems} />
                    <Button
                        label="Add Variant"
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
                        <i className="pi pi-list" /> {totalCount} Total Variants
                    </span>
                </div>
            </Card>

            <Card title="Variant List">
                <DataTable value={variants} paginator rows={5} tableStyle={{ minWidth: '40rem' }}>
                    
                    <Column field="name" header="Variant Name"></Column>
                    <Column field="model" header="Model"></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card>
        </div>
    );
}