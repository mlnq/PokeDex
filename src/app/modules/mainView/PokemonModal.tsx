import { Button } from "@mui/material";
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PokemonDetailsForm from "./PokemonDetailsForm";

interface Props{
    handleOpen: ()=>void,
    handleClose:()=>void,
    open:boolean
  }

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
  };
  
export default function ResearchProjectModal({handleOpen,handleClose,open}:Props){


    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {/* {project?.name} */}
            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {/* {project?.goal} */}
            </Typography>

            <PokemonDetailsForm/>

          </Box>
        </Fade>
      </Modal>
    );
}