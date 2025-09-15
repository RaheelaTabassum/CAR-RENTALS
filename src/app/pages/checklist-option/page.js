'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ChecklistOptionPage() {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'Checklist Option' }
    ];

    // Sample Data
    const options = [
        { id: 1, name: 'Tyre Pressure', category: 'Exterior', status: 'Active' },
        { id: 2, name: 'Seat Condition', category: 'Interior', status: 'Active' },
        { id: 3, name: 'Oil Level', category: 'Engine', status: 'Inactive' },
    ];

    // Counts
    const activeCount = options.filter(o => o.status === 'Active').length;
    const inactiveCount = options.filter(o => o.status === 'Inactive').length;
    const totalCount = options.length;

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
                        label="Add Option"
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
                        <i className="pi pi-list" /> {totalCount} Total Options
                    </span>
                </div>
            </Card>

            <Card title="Checklist Option List">
                <DataTable value={options} paginator rows={5} tableStyle={{ minWidth: '30rem' }}>
                    <Column field="name" header="Option Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column header="Active" body={activeBody}></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card> 
        </div>
    );
}