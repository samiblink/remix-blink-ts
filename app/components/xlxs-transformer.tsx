import React from "react"
import XLSX from 'xlsx'
import { useState } from 'react';

interface Product {
    _id: number;
    name: string;
    price: number;
    cost: number;
    sku: string;
    productGroup: string;
    inStock: number;
    freeBalance: number;
}

export default function ProductExceltoJson() {

    return (
        <div>
           {/*<input type="file" onChange={handleFileUploaded} />
            {data && <pre>{JSON.stringify(XLSX.utils.sheet_to_json<Product>(wb.Sheets[wb.SheetNames[0]]))}</pre>}
    */}
        </div>
    )
}