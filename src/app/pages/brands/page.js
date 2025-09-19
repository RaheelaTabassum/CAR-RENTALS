'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [isActive, setIsActive] = useState(true);
    const toast = useRef(null);

    // Fetch brands from API
    const fetchBrands = async () => {
        try {
            const res = await fetch('/api/v1/brands');
            const data = await res.json();
            setBrands(
                data.map(b => ({
                    ...b,
                    status: b.is_active ? 'Active' : 'Inactive'
                }))
            );
        } catch (err) {
            console.error('Failed to fetch brands', err);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    // Counts
    const activeCount = brands.filter(b => b.status === 'Active').length;
    const inactiveCount = brands.filter(b => b.status === 'Inactive').length;
    const totalCount = brands.length;

    // Table helpers
    const imageBody = (row) => <img src={row.image || '/default.png'} alt={row.name} width="40" />;
    const activeBody = (row) => <span>{row.status === 'Active' ? 'Yes' : 'No'}</span>;
    const actionBody = () => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text severity="info" />
        </div>
    );

    // Add brand form submit
    const handleAddBrand = async () => {
        if (!brandName.trim()) {
            toast.current.show({ severity: 'warn', summary: 'Validation', detail: 'Brand name is required' });
            return;
        }

        try {
            const res = await fetch('/api/v1/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: brandName, is_active: isActive }),
            });
            const data = await res.json();

            if (res.ok) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Brand added successfully' });
                setBrandName('');
                setIsActive(true);
                setShowSidebar(false);
                fetchBrands();
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: data.error });
            }
        } catch (err) {
            console.error(err);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add brand' });
        }
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />

            <Card className="shadow-2 mb-4">
                <div className="flex justify-between items-center mb-3">
                    <BreadCrumb model={[
                        { label: 'Home', url: '/' },
                        { label: 'Admin' },
                        { label: 'Brands' }
                    ]} />
                    <Button
                        label="Add Brand"
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
                        <i className="pi pi-times " /> {inactiveCount} Inactive
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="pi pi-users" /> {totalCount} Total Brands
                    </span>
                </div>
            </Card>

            <Card className="mb-4">
                <div className="flex gap-6 flex-wrap">
                    {brands.map((brand) => (
                        <div key={brand.id} className="flex flex-col items-center w-28">
                            <img src={brand.image || '/default.png'} alt={brand.name} width="40" />
                            <span className="mt-2 font-semibold">{brand.name}</span>
                            <span className={`mt-1 text-xs font-medium ${brand.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                {brand.status}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <DataTable value={brands} paginator rows={5} tableStyle={{ minWidth: '40rem' }}>
                    <Column header="Image" body={imageBody}></Column>
                    <Column field="name" header="Name"></Column>
                    <Column header="Active" body={activeBody}></Column>
                    <Column header="Action" body={actionBody}></Column>
                </DataTable>
            </Card>

            {/* Sidebar Form */}
            <Sidebar visible={showSidebar} onHide={() => setShowSidebar(false)} position="right" baseZIndex={1000}>
                <h3>Add Brand</h3>
                <div className="flex flex-col gap-3 mt-3">
                    <label htmlFor="brandName">Brand Name</label>
                    <InputText id="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} />

                    <div className="flex align-items-center gap-2 mt-2">
                        <Checkbox inputId="isActive" checked={isActive} onChange={e => setIsActive(e.checked)} />
                        <label htmlFor="isActive">Active</label>
                    </div>

                    <Button label="Submit" icon="pi pi-check" className="mt-3" onClick={handleAddBrand} />
                </div>
            </Sidebar>
        </div>
    );
}
