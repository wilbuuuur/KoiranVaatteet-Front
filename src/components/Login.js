import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { DB_URL } from "../constants.js";
import Vaatelist from "./Vaatteet.js";
import { Tab, Tabs } from "@mui/material";
import Valmistajat from "./Valmistajat.js";
import Ympyra from "./Ympyra.js";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [value, setValue] = useState("one");

  const handleChanged = (event, value) => {
    setValue(value);
  };

  const login = () => {
    fetch(DB_URL + "loginn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return (
      <div>
        <Tabs value={value} onChange={handleChanged}>
          <Tab label="Vaatteet" value="one" />
          <Tab label="Valmistajat" value="two" />
          <Tab label="Diagram" value="three" />
          <Button variant="outlined" color="primary" onClick={logout}>
            Logout
          </Button>
        </Tabs>
        {value === "one" && (
          <div>
            <Vaatelist />
          </div>
        )}
        {value === "two" && (
          <div>
            <Valmistajat />
          </div>
        )}
        {value === "three" && (
          <div>
            <Ympyra />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </div>
    );
  }
}

export default Login;
