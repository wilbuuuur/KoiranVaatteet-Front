import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function LisaaVaate(props) {
    const [open, setOpen] = React.useState(false);
    const [vaate, setVaate] = React.useState({
        name: '',
        type: '',
        price: '',
        valmistaja: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        props.lisaaVaate(vaate);
        setOpen(false);
    };

    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
        Lisää vaate
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Vaate</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Vaatteen nimi"
            value={vaate.name}
            onChange={e => setVaate({...vaate, name: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Tyyppi"
            value={vaate.type}
            onChange={e => setVaate({...vaate, type: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Hinta"
            value={vaate.price}
            onChange={e => setVaate({...vaate, price: e.target.value})}
            fullWidth
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Takaisin</Button>
          <Button onClick={handleSave}>Tallenna</Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}