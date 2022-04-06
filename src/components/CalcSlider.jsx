import React from 'react'


/** MUI */
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function CalcSlider({ label, id, onChange, valueText, marks, defaultValue, min, max, step }) {
  return (
    <Box width={250} >
      <Typography id="input-slider" gutterBottom>
        {label}: <Box sx={{ fontWeight: 'bold', display: 'inline' }}> {valueText} </Box>
      </Typography>
      <Slider
        onChange={(e) => onChange(id, e.target.value)}
        aria-label={label}
        defaultValue={defaultValue}
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        min={min}
        max={max}
      />
    </Box>

  )
}

export default CalcSlider