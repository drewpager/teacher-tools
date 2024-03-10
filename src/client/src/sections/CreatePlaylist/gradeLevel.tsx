import React, { useState } from 'react';
import { Slider, Box, Typography } from "@mui/material";
import './createPlaylist.scss';

interface props {
  level: number[];
  setLevel: (level: number[]) => void;
  onChange: (event: Event, newLevel: number[]) => void;
}

const minDistance = 1;

const marks = [
  {
    value: 13,
    label: '12+',
  },
  {
    value: 2,
    label: 'Elementary'
  },
  {
    value: 6,
    label: 'Middle'
  },
  {
    value: 9,
    label: 'High'
  }
]

export const GradeLevel = ({ level, setLevel, onChange }: props) => {

  const [value2, setValue2] = useState<number[]>(level);

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 13 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
      setLevel(newValue as number[]);
    }
    onChange(event, newValue as number[]);
    setLevel(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }} className="button--slider-playlist">
      <Typography>
        Grade Level
      </Typography>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        min={1}
        max={13}
        marks={marks}
        onChange={handleChange2}
        valueLabelDisplay="on"
        color={"secondary"}
        disableSwap
      />
    </Box>
  )
}