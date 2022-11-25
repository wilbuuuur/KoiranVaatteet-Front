import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { API_URL_VALMISTAJAT, API_URL_VALMISTAJA_DEL } from '../constants';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import LisaaValmistaja from './LisaaValmistaja';



export default function Valmistajat() {
    const [valmistajat, setValmistajat] = useState([]);

    const [columnDefs] = useState ([
        { field: 'name', sortable: true, filter: true},
        {
            headerName: '',
            field: 'valmistajaid',
            width: 120,
            cellRenderer: params => <IconButton size='small' color='error' onClick={() => deleteValmistaja(params.value)}>
            <DeleteIcon/>
            </IconButton>
        },
        
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
        .then(data => setValmistajat(data))
        .catch(err => console.log(err))
    }

    const deleteValmistaja = (id) => {
        if(window.confirm('Are you sure?')) {
            fetch(API_URL_VALMISTAJA_DEL + id, {method: 'DELETE'})
            .then(response => {
                if(response.ok)
                    getValmistajat();
                else
                    alert('Something went wrong')
            })
            .catch(err => console.log(err))
        }
    }

    const addValmistaja = (vaate) => {
        console.log(vaate);
      fetch(API_URL_VALMISTAJAT, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(vaate)
    })
      .then(response => {
          if (response.ok)
           getValmistajat();
          else
           alert('something went wrong')
      })
      .catch(err => console.error(err))
  }

    return(
        <div className="App">
            <LisaaValmistaja addValmistaja={addValmistaja}/>
            
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
