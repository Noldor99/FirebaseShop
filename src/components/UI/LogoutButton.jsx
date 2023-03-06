import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const LogoutButton = () => {

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
      navigate('')
  };


  const navigate = useNavigate()

  return (
    <Button
      sx={{color:'white'}}
      onClick={logoutUser}>
      Logout
    </Button>
  )
}

export default LogoutButton