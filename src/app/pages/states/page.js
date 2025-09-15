'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function StatesPage() {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'States' }
    ];

    // Sample Data
    const states = [
        { id: 1, name: 'California', code: 'CA', status: 'Active' },
        { id: 2, name: 'Texas', code: 'TX', status: 'Active' },
        { id: 3, name: 'Nevada', code: 'NV', status: 'Inactive' },
    ];

    // Counts
    const activeCount = states.filter(s => s.status === 'Active').length;
    const inactiveCount = states.filter(s => s.status === 'Inactive').length;
    const totalCount = states.length;

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
                        label="Add State"
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
                        <i className="pi pi-globe" /> {totalCount} Total States
                    </span>
                </div>
            </Card>

            <Card title="State List">
                <DataTable value={states} paginator rows={5} tableStyle={{ minWidth: '40rem' }}>
                    <Column field="name" header="State Name"></Column>
                    <Column field="code" header="Code"></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card>
        </div>
    );
}