import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import Loading from './Loading';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import Autocomplete from '@material-ui/lab/Autocomplete';
import {Link} from 'react-router-dom';

function App() {

  const [data, setData] = useState({type: 2});
  const [error, setError] = useState({});
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState();

  const onChange = (e)=>{
    let d = {...data};

    d[e.target.name] = e.target.value;

 
    setData(d);


  }

  const doRegister = ()=>{

    setLoading(true);
   
    fetch("/_api/main/register",{
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



        if (result.success){
          window.location.href= result.redirect_uri;
          return;
        }
        
        if (result.error){
          setError(result.error);
          
        }
        setLoading(false);
      }
    )
    .catch(error => {
      
        setError(true)
        setLoading(false);

      }
    )
  }



  const loadSchools = () => {

    fetch("/_api/main/schools", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(res => {

        return res.json();
      }
      ).then(
        (result) => {

          setSchools(result.items);


        }
      )
      .catch(error => {


      }
      )

  }

  useEffect(() => {
    loadSchools();
  }, [])

  let logo = window.APP_LOGO || process.env.PUBLIC_URL + '/' + window.APP_ID + '.png';
  return (
    <div>

      <Grid container spacing={1}>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
            <p><img alt={window.APP_NAME} src={logo} style={{ width: 150 }} /></p>
            <p>{window.APP_NAME}</p>
        </Grid>
      </Grid>


      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ margin: 16, position: 'relative' }}>
          {loading && <Loading show/>}
            <div style={{ padding: 16 }}>
              <h1>Daftar Guru</h1>
              <p>Buat akun Guru baru,  <Link to="/register/">buat akun siswa klik di sini</Link> </p>

              <div style={{ marginTop: 16 }}>  <TextField
                label="Nama Lengkap"
                variant="outlined"
                fullWidth
                name={"name"}
                value={data.name}
                onChange={onChange}
                error={error.name}
                helperText={error.name? error.name[0]: ''}
              />
              </div>
              <div style={{ marginTop: 16 }}>  <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name={"email"}
                value={data.email}
                onChange={onChange}
                error={error.email}
                  helperText={error.email? error.email[0]: ''}
              />
              </div>
              <div style={{ marginTop: 16 }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name={"password"}
                  value={data.password}
                  onChange={onChange}
                  error={error.password}
                  helperText={error.password? error.password[0]: ''}
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <TextField
                  label="Ulangi Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name={"password_repeat"}
                  value={data.password_repeat}
                  error={data.password_repeat != data.password}
                  helperText={data.password_repeat != data.password? "Password tidak sama": ""}
                  onChange={onChange}
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <Autocomplete
                 
                  options={schools}
                  onChange={(e,v)=>{

                    let d = {...data};

                    d['school'] = v.id
                
                    
                    setData(d);
                
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField fullWidth {...params} label="Sekolah" variant="outlined" />}
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <Button variant="contained" color="primary" size="large" fullWidth type="submit" onClick={()=>doRegister()}>
                  Daftar
                </Button>
              </div>

            </div>

            <div style={{ padding: 16, borderTop: '1px solid #808080' }}>

              Sudah  punya akun? <a href="/"> masuk disini</a>
            </div>
          </Paper>
        </Grid>

      </Grid>

      <p style={{ color: 'grey', fontSize: '80%', textAlign: 'center' }}> &copy; {window.APP_NAME} - Didukung oleh Geschool</p>
    </div>
  );
}

export default App;

