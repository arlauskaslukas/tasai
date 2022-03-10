import { Delete, ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from '@mui/material'
import { flexbox } from '@mui/system'
import React from 'react'

function LayerHyperparametersDistributor(title)
{
    if(title === "Input")
    {
        return <InputLayerHyperparameters/>
    }
}

const InputLayerHyperparameters = () => {
    return(
        <>
            <div style={{display:"flex", flexDirection:'row', justifyContent:'right'}}>
                <Button color="warning" variant='contained' startIcon={<Delete/>}>Ištrinti sluoksnį</Button>
            </div>
            <TextField required fullWidth label={"Įvesties forma"} variant="outlined"/>
            <TextField fullWidth label="Paketo dydis (batch size)" variant='outlined'/> 
        </>
    );
}

export const LayerHyperparameters = ({title, idx}) => {
  return (
    <div>
        <Accordion style={{marginBlock:'20px'}}>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                <Typography>
                    Sluoksnio nr. {idx} - {title} hiperparametrai
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {LayerHyperparametersDistributor(title)}
            </AccordionDetails>
        </Accordion>
    </div>
  )
}
