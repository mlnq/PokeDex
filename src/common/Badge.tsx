import { Chip } from '@mui/material'
import React from 'react'


interface Props{
    content:string;
    colorType?:string;
    sx?:any;
}

export default function Badge({content,colorType,sx}:Props){

    const typeColor: any = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
      }
      function getTypeColor(type: string): string {
        return typeColor[type] ||  '#A8A77A'
      }

    return(
        <>
            <Chip sx={{fontSize:16,color:'white', ...sx}} key={content} label={content} style={{backgroundColor:getTypeColor(content)}} ></Chip>
        </>
    )

} 