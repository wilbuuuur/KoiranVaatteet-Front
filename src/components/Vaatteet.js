import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

import Lisaa from './lisaa';
import Muokkaa from './Muokkaa';
import { API_URL } from '../constants';



function Vaatelist () {
    const [vaatteet, setVaatteet] = useState ([]);

    const [columnDefs] = useState ([
        {field: 'name', sortable: true, filter: true},
        {field: 'type', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true, width: 150},
        {field: 'valmistaja', sortable: true, filter: true},
        {
            width: 120,
            cellRenderer: params => <Muokkaa data={params.data} updateVaate={updateVaate} />
        },
        {
            cellRenderer: params =>
             <Button size='small' color='error' onClick={() => deleteVaate(params.data)}>Delete</Button>
        }
    ])

    const getVaatteet = () => {
        fetch(API_URL)
        .then(response => {
            if (response.ok)
             return response.json();
            else
             alert('something went wrong')
        })
        .then(data => setVaatteet(data._embedded.vaates))
        .catch(err => console.error(err))
    }
    useEffect(() => {
       getVaatteet();
    }, [])

    const deleteVaate = (data) => {
      if (window.confirm('Are you sure'))
        fetch(data._links.vaate.href, {method: 'DELETE'})
        .then(response => {
            if (response.ok)
             getVaatteet();
            else
             alert('something went wrong')
        })
    }

    const addVaate = (vaate) => {
        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(vaate)
        })
        .then(response => {
            if (response.ok)
             getVaatteet();
            else
             alert('Vituiks män');
    })
    .catch(err => console.error(err))
         }

    const updateVaate = (vaate, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(vaate)
        })
        .then(response => {
            if (response.ok)
             getVaatteet();
            else
             alert('Vituiks män');
     })
    .catch(err => console.error(err))

    }



    return (
        <>
        <Lisaa  addVaate={addVaate}/>
        <div className= 'ag-theme-material' style={{height: 650, width:'90%', margin: 'auto'}}>
            
            <AgGridReact
                rowData={vaatteet}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        </>
       

    );
}

export default Vaatelist;