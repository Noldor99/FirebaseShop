import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { orange } from "@mui/material/colors";
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { selectshowFilter, SET_FILTER } from '../../store/slice/filterSlice';

const ShowFilter = () => {
  
  const showFilter = useSelector(selectshowFilter);
  const dispatch = useDispatch();
  return (
    <Box
    sx={{ display: 'flex', alignItems: 'center', gap: '10px'}}
    onClick={() => dispatch(SET_FILTER())}
    >
      <SettingsIcon size={20} style={{ color: orange[500] }} />
      <Typography fontWeight={600}>
        {showFilter ? 'Hide Filter' : 'Show Filter'}
      </Typography>
    </Box>
  )
}

export default ShowFilter