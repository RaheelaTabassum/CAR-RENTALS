'use client';
import React from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

export default function BrandsPage() {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Admin' },
        { label: 'Brands' }
    ];

    // Sample Data
    const brands = [
        { id: 1, image: '/toyota.png', name: 'Toyota', status: 'Active' },
        { id: 2, image: '/honda.png', name: 'Honda', status: 'Active' },
        { id: 3, image: '/ford.png', name: 'Ford', status: 'Inactive' },
    ];

    // Counts
    const activeCount = brands.filter(b => b.status === 'Active').length;
    const inactiveCount = brands.filter(b => b.status === 'Inactive').length;
    const totalCount = brands.length;

    // Helpers
   // ...existing code...

    // Helpers
    const activeBody = (row) => (
        <span>{row.status === 'Active' ? 'Yes' : 'No'}</span>
    );

    const imageBody = (row) => (
        <img src={row.image} alt={row.name} width="40" />
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
                        label="Add Brand"
                        icon="pi pi-plus"
                        className="p-button-sm p-button-primary"
                    />
                </div>
                <div className="flex gap-5 text-sm my-3">
                    <span className="flex items-center gap-2">
                        <i className="pi pi-check" /> {activeCount} Active
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="pi pi-times " /> {inactiveCount} Inactive
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="pi pi-users" /> {totalCount} Total Brands
                    </span>
                </div>
            </Card>

            {/* Brand logos, names, and status above table */}
                    
            <Card className="mb-4">
                <div className="flex gap-6 flex-wrap">
                    {brands.map((brand) => (
                        <div key={brand.id} className="flex flex-col items-center w-28">
                            <img src={brand.image} alt={brand.name} width="40" />
                            <span className="mt-2 font-semibold">{brand.name}</span>
                            <span className={`mt-1 text-xs font-medium ${brand.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                {brand.status}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
            

            <Card >
                <DataTable value={brands} paginator rows={5} tableStyle={{ minWidth: '40rem' }}>
                    <Column header="Image" body={imageBody}></Column>
                    <Column field="name" header="Name"></Column>
                    <Column header="Active" body={activeBody}></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card>
        </div>

    );
}