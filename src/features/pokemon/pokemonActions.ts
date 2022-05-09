import Api from './api/pokemonApi';
import { createAsyncThunk, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Pokemon from "../../models/Pokemon";
import Stats from '../../models/Stats';
import PokemonDetails from '../../models/PokemonDetails';
import FastAverageColor from 'fast-average-color';

//api zaciagnięte
const api = new Api();



//AKCJE
export const getPokemons = createAsyncThunk('pokemon/getPokemons',async () =>{
        const response = await api.getPokemons();
        const poks= response.data.results;
        const parsedPokemons= await pokemonsParser(poks);

        return parsedPokemons;
});


export const getPokemon = createAsyncThunk('pokemon/getPokemon',async (id:number)  =>{
   
    return getPoks(id,false);
});


//TODO dodać logikę że max 2 
export const setSelectedPokemonId = createAsyncThunk('pokemon/setSelectedPokemonId',async (id:number)  =>{
    return id;
});


//AKCJE
export const getPokemonDetailsToCompare = createAsyncThunk('pokemon/getPokemonDetailsToCompare',async (ids:Array<number>)  =>{
    
    const compare = [];
     compare.push(await getPoks(ids[0],true))
    compare.push(await getPoks(ids[1],true))   

    return compare;
});

const pokemonParserDetails = (pokeData:any)=>{
    
    const type=pokeData.types;
    
    const types = type.map((e:any) =>e.type.name)

    const abilities:string[] =[];
    const stats:Stats[] =[];

    for (const [,value] of Object.entries(pokeData.abilities))
    {
        //@ts-ignore
        let ability:any|unknown  = value ? value?.ability?.name : '';
        abilities.push(ability);
    }
    for (const [,statistic] of Object.entries(pokeData.stats))
    {
            let stat:Stats={
                //@ts-ignore
                name:statistic?.stat.name,
                //@ts-ignore
                base:statistic.base_stat,
                //@ts-ignore
                effort:statistic.effort
            };
            stats.push(stat);
    }   

    for (const [,statistic] of Object.entries(pokeData.stats)){
        
    }

    //narazie na details poprostu
    let pokemon:PokemonDetails =
    {
        id:pokeData.id,
        name:pokeData.name,
        type:types,
        abilities: [...abilities],
        stats:stats,
        //@ts-ignore
        avatar:pokeData.sprites.other.dream_world.front_default,//sprites.other.dream_world.front_default //sprites.other.official-artwork
        base_experience:pokeData.base_experience,
        weight:pokeData.weight
    };
    
    return pokemon;
}

const pokemonsParser = async (data:any) =>{
    let parsedPokemons :any=[];
    for await (const pokemon of data) {
        const id:number = parseInt(pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/",'').substring(0));
        let pokemonData:any = await getPoks(id,false);
        parsedPokemons.push(pokemonData);
    }
    return parsedPokemons;
}

// const getPoks= async (id:number)=>{
//     const response = await api.getPokemon(id);
//     let parsedPokemon = pokemonParserDetails(response.data);
//     return parsedPokemon;
// }

//z api
const getPoks= async (id:number,detailed:boolean)=>{
    const response = await api.getPokemon(id);
    let parsedPokemon = pokemonParserDetails(response.data);

//     const fac = new FastAverageColor();
//     var pokeImg = new Image();
//     pokeImg.src=parsedPokemon.avatar;
//     pokeImg.alt =`${parsedPokemon.name}`;
//     let color:any=null;
//     // color = fac.getColor(pokeImg);////  ^ note the exclamation mark here  
// // alert(color);

//     fac.getColorAsync(pokeImg)
//         .then(color => {
//             //@ts-ignore
//             color=color.rgba? color.rgba : '#333';
//             console.log(color.rgb);
            
//         })
//         .catch(e => {
//             console.log(e);
//         });

//     parsedPokemon.color=color? color.rgba : '#333';
    return parsedPokemon;
}

