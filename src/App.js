import './App.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Vaatelist from './components/Vaatteet';
import Valmistajat from './components/Valmistajat';
import Ympyra from './components/Ympyra';
import Login from './components/Login';


function App() {

  const [value, setValue] = useState('one');

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
      <Login/>
      
    </div>
  );
}

export default App;
