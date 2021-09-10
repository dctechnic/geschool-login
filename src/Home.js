import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function App() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [keepLogin, setKeepLogin] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const doLogin = () => {

    let data = { email, password, keepLogin};
    setLoading(true);
    fetch("/_api/main/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),


    })
      .then(res => {

        return res.json();
      }
      ).then(
        (result) => {
          

          if (result.success) {
            window.location.href = result.redirect_uri;
            return;
          }

          if (result.error) {
            setError(result.error.code);
            
          }

          setLoading(false)
        }
      )
      .catch(error => {
 
        setError(true)
        setLoading(false)
      }
      )
  }


  let logo = window.APP_LOGO || process.env.PUBLIC_URL + '/logo.png';
  let appName = window.APP_NAME || "Geschool";

  return (
    <div>
      {/* <Hidden smUp> */}
      <Grid container spacing={1}>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <p><img alt={appName} src={logo} style={{ width: 150 }} /></p>
          <p>{appName}</p>
        </Grid>
      </Grid>

      {/* </Hidden> */}
      <Grid container spacing={1} justify={"center"} >  
   

        {/* <Hidden only={"xs"}>
          <Grid item xs={12} sm={6} md={8} style={{ textAlign: 'center', marginTop: 90 }}>
            <p><img alt="Logo" src={logo} style={{ width: 150 }} /></p>
            <p>K2MA DIY</p>
          </Grid>
        </Hidden> */}


        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper style={{ margin: 16, position: 'relative' }}>
            {loading && <Loading show/>}
            <form>
              <div style={{ padding: 16 }}>
                <h1>Masuk</h1>
                <p>Silakan masuk untuk mulai gunakan </p>


                <div style={{ marginTop: 16 }}>  <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  helperText={error == 40001 ? 'Email tidak ditemukan' : ''}
                  fullWidth
                />
                </div>
                <div style={{ marginTop: 16 }}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    error={error}
                    helperText={error == 40002 ? <div>Password tidak sesuai. <a href="/forgot">Lupa Password?</a></div> : ''}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                  
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={keepLogin}
                        onChange={()=>setKeepLogin( v => !v )}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Ingat saya di perangkat ini"
                  />
                </div>
                <div style={{ marginTop: 16, position: 'relative'}}>
             
                  <Button variant="contained" color="primary" disabled={loading} size="large" fullWidth type="submit" onClick={(e) => { e.preventDefault(); doLogin() }}>
                    {loading? "...": "Masuk"}
                  </Button>
                </div>
              </div>

              <div style={{ padding: 16, borderTop: '1px solid #808080' }}>

                Belum punya akun? <Link to="./register/"> Daftar disini</Link>
              </div>
            </form>
          </Paper>
        </Grid>

      </Grid>

      <p style={{ color: 'grey', fontSize: '80%', textAlign: 'center' }}> &copy; {appName} - Didukung oleh Geschool</p>
    </div>
  );
}

export default App;

