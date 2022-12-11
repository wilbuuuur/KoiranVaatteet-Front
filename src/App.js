import './App.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Vaatelist from './components/Vaatteet';
import Valmistajat from './components/Valmistajat';
import Ympyra from './components/Ympyra';
import Login from './components/Login';
import { Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";


function App() {

  const [value, setValue] = useState('Vaatteet');

  const handleChange = (event, value) => {
      setValue(value);
  };

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar> 
          <Typography variant='h6'>
            Vaate
          </Typography>
        </Toolbar>
      </AppBar>

      

      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Vaatteet" value="Vaatteet" />
          <Tab label="Valmistajat" value="Valmistajat" />
          <Tab label="Diagram" value="Diagram" />
          <Tab label="Login" value="Login" />
          
        </Tabs>
        {value === "Vaatteet" && (
          <div>
            <Vaatelist />
          </div>
        )}
        {value === "Valmistajat" && (
          <div>
            <Valmistajat />
          </div>
        )}
        {value === "Diagram" && (
          <div>
            <Ympyra />
          </div>
        )}
        {value === "Login" && (
          <div>
            <Login/>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default App;
