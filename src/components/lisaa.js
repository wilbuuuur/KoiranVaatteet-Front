import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";
import { API_URL_VALMISTAJAT } from "../constants";

export default function LisaaVaate(props) {
  const [open, setOpen] = React.useState(false);
  const [vaate, setVaate] = React.useState({
    name: "",
    type: "",
    price: "",
    valmistaja: "",
  });

  const [valmistajat, setValmistajat] = React.useState([]);

  const getValmistajat = () => {
    console.log("get valmistajat pyörii");
    fetch(API_URL_VALMISTAJAT)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Something went wrong");
      })
      .then((data) => setValmistajat(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getValmistajat();
    console.log({valmistajat});
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addVaate(vaate);
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
            onChange={(e) => setVaate({ ...vaate, name: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Tyyppi"
            value={vaate.type}
            onChange={(e) => setVaate({ ...vaate, type: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Hinta"
            value={vaate.price}
            onChange={(e) => setVaate({ ...vaate, price: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            select
            label="Valmistaja"
            value={vaate.valmistaja}
            fullWidth
          >
            {valmistajat.map((option) => (
              <MenuItem key={option.valmistajaid} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Takaisin</Button>
          <Button onClick={handleSave}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
