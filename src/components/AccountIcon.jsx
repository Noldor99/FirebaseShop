import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const AccountIcon = ({displayName}) => {

  const navigate = useNavigate()

  return (
    <Button 
      onClick={()=>navigate('')}
      sx={{color:'#fff'}}
      >
        <AccountCircleIcon size={16} />
        Hi, {displayName}
    </Button>
  )
}

export default AccountIcon