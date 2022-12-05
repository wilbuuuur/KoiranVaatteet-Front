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
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Vaatteet" value="one" />
            <Tab label="Valmistajat" value="two" />
            <Tab label="Diagram" value="three" />

            </Tabs>
        </Toolbar>
      </AppBar>
      <Login/>
      {value==='one' && <div><Vaatelist/></div>}
      {value==='two'&& <div><Valmistajat/></div>}
      {value==='three'&& <div><Ympyra/></div>}
    </div>
  );
}

export default App;
