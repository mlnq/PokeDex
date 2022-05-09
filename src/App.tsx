import { Grid } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PokemonDashboard from './app/modules/mainView/PokemonDashboard';
import PokemonTable from './app/modules/mainView/PokemonTable';
import AppRoutes from './app/routes/AppRoutes';
import Navbar from './common/Navbar';

// https://stackoverflow.com/questions/68353252/how-to-implement-search-in-material-ui-datagrid
function App() {
  return (
    <BrowserRouter>
       <Grid container direction="column">
        <Grid item><Navbar></Navbar></Grid>

        <Grid item container>
          
          <Grid item xs={0} sm={1} />
          <Grid item xs={12} sm={10}>
            <AppRoutes />
          </Grid>
          <Grid item xs={0} sm={1} />

        </Grid>
      </Grid>
    </BrowserRouter>

  );
}

export default App;



