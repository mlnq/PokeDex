import { createReducer } from '@reduxjs/toolkit';
import Pokemon from '../../models/Pokemon';
import PokemonDetails from '../../models/PokemonDetails';
import { getPokemons,getPokemon,setSelectedPokemonId,getPokemonDetailsToCompare } from './pokemonActions';


//REDUCER
interface State {    
    pokemons:Pokemon[];
    pokemon:PokemonDetails;
    pokemon_2:PokemonDetails;
    selectedPokemonsId: number[];
}

const initialState: State = {
    pokemons:[],
    pokemon:{    
        id: 0,
        name: '',
        type: [],
        abilities: [],
        stats:[], 
        avatar:'', 
        base_experience:0,
        weight:0
    },
    pokemon_2:{    
        id: 0,
        name: '',
        type: [],
        abilities: [],
        stats:[], 
        avatar:'', 
        base_experience:0,
        weight:0
    },
    selectedPokemonsId:[]
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getPokemons.pending, ()=>{})
        .addCase(getPokemons.fulfilled, (state, action)=>{
                state.pokemons=action.payload;
                })
        .addCase(getPokemons.rejected, ()=>{})
//getPokemon
        .addCase(getPokemon.pending, ()=>{})
        .addCase(getPokemon.fulfilled, (state, action)=>{
                 state.pokemon=action.payload;
                })
        .addCase(getPokemon.rejected, ()=>{})
        
//setSelectedPokemonId     
        .addCase(setSelectedPokemonId.pending, ()=>{})
        .addCase(setSelectedPokemonId.fulfilled, (state, action)=>{
                 state.selectedPokemonsId.push(action.payload);
                })
        .addCase(setSelectedPokemonId.rejected, ()=>{})

//getPokemonDetailsToCompare     
        .addCase(getPokemonDetailsToCompare.pending, ()=>{})
        .addCase(getPokemonDetailsToCompare.fulfilled, (state, action)=>{

                //@ts-ignore
                state.pokemon = action.payload[0];
                //@ts-ignore
                state.pokemon_2 =action.payload[1];
                console.log(action.payload);
                

                })
        .addCase(getPokemonDetailsToCompare.rejected, ()=>{})

});

