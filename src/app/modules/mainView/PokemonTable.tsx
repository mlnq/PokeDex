import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Checkbox, Chip, Fade, Grid, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridToolbar, plPL } from "@mui/x-data-grid";
import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import pokeTest from '../../../data/35.json'
import { getPokemon, getPokemons,setSelectedPokemonId,getPokemonDetailsToCompare } from '../../../features/pokemon/pokemonActions';
import { useAppSelector } from '../../hooks';
import PokemonModal from './PokemonModal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import { Box } from '@mui/system';
import Badge from '../../../common/Badge';


interface Props{
   styles?: CSSProperties | undefined;
}


export default function PokemonTable({styles}:Props)
{
   const [open,setOpen]= useState<boolean>(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   //USE SELECTORY
   const pokemons = useAppSelector((state) => state.pokemon.pokemons);
   const pokemon = useAppSelector((state) => state.pokemon.pokemon);
   const pokemon_2 = useAppSelector((state) => state.pokemon.pokemon);
   const selectedPokemonsId = useAppSelector((state) => state.pokemon.selectedPokemonsId);

   const dispatch = useDispatch()

   const [currId,setCurrId] = useState(1);

// menu modal
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  
  const handleClickMenu = async(event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    const id=event.currentTarget.id;
    setCurrId(parseInt(id)-1);
    console.log(id)
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrId(1);
  };

 


   const columns=[
        {field: 'id', headerName:'Id'},
        {field: 'name', headerName:'Nazwa Pokemona',flex:1},
        {field: '_types', headerName:'Typ',flex:1,
         renderCell:(params:GridCellParams) => {
            const id = Number.parseInt(params.row.id as string) - 1;   
            const types = pokemons[id].type;

            return(
               <Stack direction="row" spacing={1}>
                {
                types.map((type:string,index:number)=>
                        (
                           <Badge content={type}  sx={{
                        fontSize: {
                           lg: 15,
                           md: 14,
                           sm: 12,
                           xs: 10
                           }
                        }}></Badge>
                        )
                    )
               }    
             </Stack>
            );
         }
        }, 
        {field: 'abilities_', headerName:'Umiejętności',flex:1,
         sortable: false,
         filterable: false,
         maxWidth:150,
         renderCell: (params: GridCellParams) => {
            const id = Number.parseInt(params.row.id as string);   
            return (
               <>
               <IconButton 
               key={id}
               id={`${id}`}
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClickMenu}
               >
                   {/* +{Object.keys(pokemons[id].abilities).length}  */}
                   +{pokemons[id].abilities.length} 
                    < DetailsIcon/>
               </IconButton>
               </>
            );}
        },
        {
           field: "details",
           headerName: "Porównaj",
           sortable: false,
           filterable: false,
           flex: 1,
           renderCell: (params: GridCellParams) => {
              const id = Number.parseInt(params.row.id as string);
              return (
                 <>
                 <IconButton onClick={() =>  selectPokemon(id)} >
                     <Checkbox />
                 </IconButton>
                 {/*
                 disabled={selectedPokemonsId.length >= 2? true:false}
                 <IconButton onClick={() => onDetailsSelected(id)} >
                 <EditIcon />
                   <Typography  variant="h6" component="h2"></Typography>
                  </IconButton> */}
                  <IconButton component={Link} to="../infoPokemon" onClick={() => onDetailsSelected(id)} >
                  <DetailsIcon />
                  <Typography  variant="h6" component="h2">szczegóły</Typography>
                  </IconButton>
                 </>
              );
           },
        },
        
       ]
       
       const selectPokemon = (id:number) => {
          if(selectedPokemonsId.length<2)
         dispatch(setSelectedPokemonId(id));
       };

       const onDetailsSelected = async(id:number) => {
          console.log(id);
          //wczytaj pokemona mozna zrobic ze pierwszo szuka ze stanu potem tworzy ew. requesta
          await dispatch(getPokemon(id));     
          handleOpen();
       };

       const onDeleteSelected = (id:number) => {
         console.log(id);
       };

       useEffect(()=>{
          
          if(pokemons.length<=0){
             dispatch(getPokemons())
            }
       },[pokemons]
       );
      
//    if(projectStore.loadingInitial) return <LoadingComponent content={"Ładowanie projektów badawczych"}/> 
const currentPokemonAbilities =  pokemons[currId]?.abilities  ?? [];

    return (
       <div style={styles}>
    <PokemonModal  handleOpen={handleOpen} handleClose={handleClose} open={open}/>
     
    <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                     'aria-labelledby': 'basic-button',
                  }}
                  >
                  {
                  currentPokemonAbilities.map((ab:string) => (
                     <MenuItem key={ab} onClick={handleCloseMenu}>
                     {ab}
                     </MenuItem>
                  ))
                  }
                  
   </Menu>

    <Box style={{ height: 520, width: '100%'}}>
      <DataGrid
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        sx={{
           fontSize: {
              lg: 15,
              md: 14,
              sm: 12,
              xs: 10
            }
         }}
         rows={pokemons}
         columns={columns}
         pageSize={10}
         // components={{ Toolbar: GridToolbar }}
         />
    </Box>
      <Box display="flex" justifyContent="flex-end">
            <Button component={Link} to="../comparePokemons" 
            startIcon={<AddIcon/>}
            onClick={async ()=>{ await dispatch(getPokemonDetailsToCompare(selectedPokemonsId));
            console.log(pokemon_2);
            
            }}
            variant="contained"
            disabled={selectedPokemonsId.length === 2 ? false : true}
            >
            Porównaj pokemony [  
            {selectedPokemonsId.length === 0 ? 
               0:selectedPokemonsId.length
            }/2]</Button>
      </Box>
    </div>
    );
}