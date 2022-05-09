import { Avatar, CardHeader, Chip, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../hooks";
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles, styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import Badge from "../../../common/Badge";
import PokemonDetails from "../../../models/PokemonDetails";
import RadarChart from "../../../common/RadarChart/RadarChart";
import FastAverageColor from "fast-average-color";
const fac = new FastAverageColor();



interface Props{
    specie?:PokemonDetails;
}


// const useStyles = makeStyles({
//     root: {
//       height: 10,
//       borderRadius: 5
//     },
//     colorPrimary: {
//       backgroundColor: '#E9E9E9'
//     },
//     bar: {
//       borderRadius: 5,
//       backgroundColor: '#333'
//     }
//   });

export default  function PokemonInfo({specie}:Props){

    const pokemon = useAppSelector((state)=> specie ? specie : state.pokemon.pokemon)
    const imageRef = useRef(null);

    const [color,setColor]=useState<any>('red');
    const [classes,setClasses] =useState<any>(null);

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 60,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? color.rgb : '#308fe8',
        },
      }));
    useEffect(()=>{
            const fac = new FastAverageColor();
            fac
                .getColorAsync(
                pokemon.avatar
                )
                .then((color) => {
                // console.log("standard");
                // console.log(color);
                //@ts-ignore
                 setColor(color);
                 setClasses({
                    borderRadius: 8,
                    backgroundColor: color
                 });

                })
                .catch((e) => {
                console.log(e);
                });
        },[pokemon]) /// zmiana poksa

    const pokeTest =pokemon;

    let types=pokeTest.type;
    console.log(pokemon);

    ///refresh jak danych nie ma w useeffect

    return (
        <Container>

        <Grid container alignItems="center" >
            <Grid item alignItems={'center'} justifyContent={'center'}>
                <img ref={imageRef} src={pokeTest.avatar} alt="fajneJPG" style={{width: 'auto', height:'9em' }}/>

                    <Typography variant="h2"  >{pokeTest.name.toUpperCase()}</Typography>

                <Box component="div" sx={{padding:3,paddingLeft:0, display:'flex' ,alignItems:'center'}}>
                {
                    types.map((type:string,index:number)=>
                        (
                            <Badge content={type} sx={{marginRight:2}}></Badge>
                        )
                    )    
                }
                
                    <PropaneTankIcon sx={{ fontSize: 20 }}/>
                    <span style={{ fontSize: 30, alignItems:'center' }}>
                    {pokeTest.weight}
                    </span>
                    <Typography variant="h2" sx={{ fontSize: 30, alignItems:'center' }} >
                        
                    </Typography>
                </Box>
            </Grid>
            <Grid item marginLeft={2}>
                
            </Grid>
         </Grid>
         {/* <Grid container >
                <PropaneTankIcon sx={{ fontSize: 60 }}/>
                <Typography variant="h2" sx={{ fontSize: 50, alignItems:'center' }} >
                    {pokeTest.weight}
                </Typography>
         </Grid> */}
         <Grid item  justifyContent={'center'} alignItems='center' display={'flex'} style={{width:'100%'}} >
             <Box   style={{width:'100%',flexDirection:'column'}}>
                <Typography variant="h2" sx={{ fontSize: 40, alignItems:'center'}} 
                style={{position:'absolute',zIndex:212,marginTop:8,marginLeft:10}}>
                    {pokemon.base_experience} exp
                </Typography>
                 <BorderLinearProgress  variant="determinate" value={pokemon.base_experience/300 *100 } />
                 <RadarChart colorStyle={color.rgba} pokemon={pokemon}/>
            </Box>
         </Grid>
        </Container>
    );
}

function useAverageColor(dom:any) {
    useEffect(() => {
      console.log("img", dom);
      fac
        .getColorAsync(dom)
        .then((color:any) => {
          console.log("color", color);
          dom.style.backgroundColor = color.rgba;
          dom.style.color = color.isDark ? "#fff" : "#000";
          return color;
        })
        .catch((e:any) => {
          console.log(e);
        });
    });
  }