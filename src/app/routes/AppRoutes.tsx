import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PokemonCompare from '../modules/mainView/PokemonCompare';
import PokemonDashboard from '../modules/mainView/PokemonDashboard';
import PokemonInfo from '../modules/mainView/PokemonInfo';
import PokemonInfoDetails from '../modules/mainView/PokemonInfoDetails';

export default function AppRoutes(){

    return(
        <Routes>
            <Route path='/' element={<PokemonDashboard/>}/>
            <Route path='/infoPokemon' element={<PokemonInfoDetails/>}/>
            <Route path='/comparePokemons' element={<PokemonCompare/>}/>
        </Routes>

    );

} 