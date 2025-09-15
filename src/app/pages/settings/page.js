'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function SettingsPage() {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'Settings' }
    ];

    // Sample Data
    const settings = [
        { id: 1, key: 'Site Title', value: 'Car Rentals', status: 'Active' },
        { id: 2, key: 'Support Email', value: 'support@carrentals.com', status: 'Active' },
        { id: 3, key: 'Maintenance Mode', value: 'Off', status: 'Inactive' },
    ];

    // Counts
    const activeCount = settings.filter(s => s.status === 'Active').length;
    const inactiveCount = settings.filter(s => s.status === 'Inactive').length;
    const totalCount = settings.length;

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
                        label="Add Setting"
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
                        <i className="pi pi-cog" /> {totalCount} Total Settings
                    </span>
                </div>
            </Card>

            <Card title="Settings List">
                <DataTable value={settings} paginator rows={5} tableStyle={{ minWidth: '30rem' }}>
                    <Column field="key" header="Setting Key"></Column>
                    <Column field="value" header="Value"></Column>
                    <Column header="Active" body={activeBody}></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card>
        </div>
    );
}