import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import Lisaa from './lisaa';
import Muokkaa from './Muokkaa';
import { API_URL, API_URL_VAATTEET } from '../constants';

function Vaatelist () {
    const [vaatteet, setVaatteet] = useState ([]);

    const [columnDefs] = useState ([
        {field: 'name', sortable: true, filter: true},
        {field: 'type', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true, width: 150},
        {headerName: 'Valmistaja' ,field: 'valmistaja.name', sortable: true, filter: true},
        {
            width: 120,
            cellRenderer: params => <Muokkaa data={params.data} updateVaate={updateVaate} />
        },
        {
            cellRenderer: params =>
            <IconButton size='small' color='error' onClick={() => deleteVaate(params.data)}>
            <DeleteIcon/>
            </IconButton>
        }
    ])

    const token = sessionStorage.getItem("jwt");

    const getVaatteet = () => {
        fetch(API_URL_VAATTEET,{
            headers: { 'Authorization' : token }
          })
        .then(response => {
            if (response.ok)
             return response.json();
            else
             alert('something went wrong')
        })
        .then(data => setVaatteet(data))
        .catch(err => console.error(err))
    }
    useEffect(() => {
       getVaatteet();
    }, [])

    const deleteVaate = (data) => {
      if (window.confirm('Are you sure')) {
        const token = sessionStorage.getItem("jwt");
        fetch(API_URL + data.id , {method: 'DELETE', headers: { 'Authorization' : token }})
        .then(response => {
            if (response.ok)
             getVaatteet();
            else
             alert('something went wrong')
        })
    }
}

    const addVaate = (vaate) => {
            console.log(vaate);
          fetch(API_URL_VAATTEET, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(vaate)
        })
          .then(response => {
              if (response.ok)
               getVaatteet();
              else
               alert('something went wrong')
          })
          .catch(err => console.error(err))
      }

    

    const updateVaate = (data) => {
        console.log(data)
        fetch(API_URL_VAATTEET+"/"+ data.id, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(data)
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