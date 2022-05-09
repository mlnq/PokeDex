import React, { useEffect, useRef } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SvgIcon } from '@material-ui/core';
import Logo from './Logo';
import { flexbox } from '@mui/system';
import { ReactSVG } from 'react-svg'
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import TestComponent from './TestComponent';

export default function Navbar(){



    return (
        <Box sx={{ flexGrow: 1, marginBottom:5 }}>

        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               <Box sx={{display:'flex',alignItems:'center'}}>
               {/* <TestComponent style={{width:"2.5em", height:"auto"}}/> */}
               <Logo style={{width:'50px'}}></Logo> <span style={{marginLeft:10}}>Pokemon </span> 
                 </Box> 
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

    );
}