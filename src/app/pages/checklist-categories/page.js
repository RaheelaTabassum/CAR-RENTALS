'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ChecklistCategoryPage() {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'Checklist Category' }
    ];

    // Sample Data
    const categories = [
        { id: 1, name: 'Exterior', status: 'Active' },
        { id: 2, name: 'Interior', status: 'Active' },
        { id: 3, name: 'Engine', status: 'Inactive' },
    ];

    // Counts
    const activeCount = categories.filter(c => c.status === 'Active').length;
    const inactiveCount = categories.filter(c => c.status === 'Inactive').length;
    const totalCount = categories.length;

    // Helpers
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
                        label="Add Category"
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
                        <i className="pi pi-list" /> {totalCount} Total Categories
                    </span>
                </div>
            </Card>

            <Card title="Checklist Category List">
                <DataTable value={categories} paginator rows={5} tableStyle={{ minWidth: '30rem' }}>
                    <Column field="name" header="Category Name"></Column>
                    <Column header="Active" body={activeBody}></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card>
        </div>
    );
}