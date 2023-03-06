import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortBy = ({ value, onChange }) => {
 
  return (
    <FormControl sx={{ m: 1, width: '100%' }}>
      <InputLabel id="sort-by-label">Sort by:</InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by-select"
        value={value}
        label="Sort by:"
        onChange={onChange}
      >
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="lowest-price">Lowest Price</MenuItem>
        <MenuItem value="highest-price">Highest Price</MenuItem>
        <MenuItem value="a-z">A - Z</MenuItem>
        <MenuItem value="z-a">Z - A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBy;
