import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import PokemonTable from './PokemonTable';


export default function PokemonDashboard(){

    return(
                <Grid container>
                    <Grid item xs={2} md={2}></Grid>
                    <Grid item xs={8} md={8}>
                    <PokemonTable styles={{marginTop:'10em'}}/>
                    </Grid>
                    <Grid item xs={2} md={2}></Grid>
                </Grid>

    );
}