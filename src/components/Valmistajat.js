import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { API_URL_VALMISTAJAT } from '../constants';


export default function Valmistajat() {
    const [valmistajat, setValmistajat] = useState([]);

    const [columnDefs] = useState ([
        { field: 'name', sortable: true, filter: true},
    ])

    useEffect(() => {
        getValmistajat();
    }, []);

    const getValmistajat = () => {

        fetch(API_URL_VALMISTAJAT)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Something went wrong')
        })
        .then(data => setValmistajat(data._embedded.valmistajas))
        .catch(err => console.log(err))
    }

    return(
        <div className="App">
            <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={valmistajat}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={8}
                    suppressCellSelection={true}
                />
            </div>
            
            
        </div>
    )
}
