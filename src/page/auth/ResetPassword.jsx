import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle reset password logic here
    setMessage(`Instructions for resetting your password have been sent to ${email}`);
    setEmail('');
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '90vh',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          width: '100%',
          boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)'
        }}
      >
        <Typography component="h1" variant="h5" color='orange' align="center">
          Reset Password
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
        {message && (
          <Typography variant="body2" color="textSecondary" align="center">
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
