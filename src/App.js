import './App.css';
import Vaatelist from './components/Vaatteet';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar> 
          <Typography variant='h6'>
            Vaate
          </Typography>
        </Toolbar>
      </AppBar>
      <Vaatelist />
    </div>
  );
}

export default App;
