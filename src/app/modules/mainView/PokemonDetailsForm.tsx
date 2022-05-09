import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, darken, Grid, lighten, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowId, GridRowsProp, GridToolbar, plPL } from '@mui/x-data-grid';

import { Field, Form, Formik } from 'formik';

import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import researchPatientsTable from '../../../data/researchPatientsTable.json';
import Pokemon from "../../../models/Pokemon";
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { getPokemon } from '../../../features/pokemon/pokemonActions';



const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

export default function ResearchProjectPatientsTable(){

  //let navigate = useNavigate();const {id} = useParams<{id: string}>();
    //stan na pokemona
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon|any>({
      id: 0,
      name: 'xx',
      type: '',
      abilities: []
  });

    const test= researchPatientsTable;
    const [rows, setRows] = useState<GridRowsProp>(test);

    const pokemon = useAppSelector((state) => state.pokemon.pokemon);
    const dispatch = useDispatch()


    const toggleAgreement = useCallback(
        (id: GridRowId) => () => {
          
            setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, agreement: !row.agreement } : row,
            ),
          );
        },
        [],
      );
       const onDeleteSelected = (id:number) => {
        console.log(id);
      };

     
  

    useEffect(()=>{
      console.log('pokemon');
      console.log(pokemon);
     setCurrentPokemon({...pokemon})
      console.log('currentPokemon');
      console.log(currentPokemon);

    },[pokemon]);
  

    return (
      <>
      {currentPokemon.name}
        <Box
          sx={{
            height: 400,
            width: 1,
            "& .super-app-theme--true": {
              bgcolor: (theme) =>
                getBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                ),
              "&:hover": {
                bgcolor: (theme) =>
                  getHoverBackgroundColor(
                    theme.palette.success.main,
                    theme.palette.mode
                  ),
              },
            },
            "& .super-app-theme--false": {
              bgcolor: (theme) =>
                getBackgroundColor(
                  theme.palette.error.main,
                  theme.palette.mode
                ),
              "&:hover": {
                bgcolor: (theme) =>
                  getHoverBackgroundColor(
                    theme.palette.error.main,
                    theme.palette.mode
                  ),
              },
            },
          }}
        >

<Formik
         enableReinitialize={true}
         initialValues={currentPokemon}
         onSubmit={(values) => console.log(values)}
       >
         {({ handleSubmit, isValid, isSubmitting, values }) => (
           <form onSubmit={handleSubmit} >
             <Grid
               sx={{display:'flex'}}
               alignItems="center"
               justifyContent="center"
               container
               spacing={4}
             >
               <Grid item xs={12} md={6}>
                 <Field
                   component={TextField}
                   id="name"
                   name="name"
                   label="Imie"
                   value={values!.name}
                   fullWidth
                 />
               </Grid>
               <Grid item xs={12} md={6}>
                 <Field
                   component={TextField}
                   id="name"
                   name="name"
                   label="Imie"
                   value={values!.type}
                   fullWidth
                 />
               </Grid>
              
               <Grid item xs={12} >
                <Button
                    disabled={isSubmitting || !isValid}
                    color="primary"
                    variant="contained"
                    type="submit"
                    fullWidth
                >
                 Zapisz
               </Button>
               </Grid>
             </Grid>
           </form>
         )}
       </Formik>
      </Box>
      </>
    );
}