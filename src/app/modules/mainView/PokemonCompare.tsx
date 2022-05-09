import { Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import PokemonInfo from './PokemonInfo';


export default function PokemonCompare()
{
    let navigate = useNavigate();
    const pokemon = useAppSelector((state) => state.pokemon.pokemon);
    const pokemon2 = useAppSelector((state) => state.pokemon.pokemon_2);



    return(
        <>
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}><PokemonInfo specie={pokemon} /></Grid>
            <Grid item xs={4}><PokemonInfo specie={pokemon2}/></Grid>
            <Grid item xs={2}></Grid>
        </Grid>
        </>
    );
}