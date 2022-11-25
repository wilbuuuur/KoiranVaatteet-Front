import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


export default function LisaaValmistaja(props) {
  const [open, setOpen] = React.useState(false);
  const [valmistaja, setValmistaja] = React.useState({
    name: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addValmistaja(valmistaja);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Lisää valmistaja
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Valmistaja</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Valmisatajan nimi"
            value={valmistaja.name}
            onChange={(e) => setValmistaja({ ...valmistaja, name: e.target.value })}
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
  );
}
