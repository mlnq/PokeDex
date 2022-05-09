import { Grid } from '@mui/material';
import React from 'react'
import { useAppSelector } from '../../hooks';
import PokemonInfo from './PokemonInfo';


export default function PokemonInfoDetails(){

    const pokemon = useAppSelector((state) => state.pokemon.pokemon);


    return(
        <>
        <Grid container sx={{ display:'flex',marginLeft:'25%',width:'50%'}}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}><PokemonInfo specie={pokemon} /></Grid>
            <Grid item xs={2}></Grid>
        </Grid>
        </>
    );
}