import React from 'react';
import { Paper, TextField, Button } from '@mui/material';

const MainLogin = () => {
  return (
    <div className='loginBg' style={{
      backgroundImage: 'url(/LoginBg.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '145vh', // Ensure the container covers the full height of the viewport
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Paper style={{
        padding: '25px',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '35px',
        width: '25%',
        height:'57vh',
        fontFamily: 'Georgia, "Times New Roman", Times, serif',
        border: 'solid 5px #FFFFFF',
        transform: 'translateY(15%)',
      }}>

        <h3 style={{
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
          fontSize: '25px',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}>Welcome Admin!</h3>
    <span style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize: '20px', display: 'block', textAlign: 'left',  color: '#FFFFFF', marginTop: '30px'}}>Username</span>

        <TextField
          id="uname"
          variant="outlined"
          fullWidth
          style={{
            marginBottom: '20px',
            marginTop: '20px',
            marginLeft: '-2px',
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            border: '3px solid #FFFFFF',
            background: 'rgba(199, 161, 122, 0.9)',
            borderRadius: '5px',
            color: '#FFFFFF',
          }}
        />
 <span style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontSize: '20px', display: 'block', textAlign: 'left',  color: '#FFFFFF',marginBottom: '15px'}}>Password</span>
        <TextField
          id="pword"
          type="password"
          variant="outlined"
          fullWidth
          style={{
            marginBottom: '10px',
            marginLeft: '-2px',
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            border: '3px solid #FFFFFF',
            borderRadius: '5px',
            background: 'rgba(199, 161, 122, 0.9)',
          }}
        />

        <Button style={{
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
          marginTop: '28px',
          marginBottom: '-10px',
          fontSize: '23px',
          color: '#30271C',
          background: '#F7DBBE',
          fontWeight: 'bold',
          padding: '5px',
          width: '40%',
          borderRadius: '5px',
          textTransform: 'lowercase',
        }}>Log in</Button>

      </Paper>
    </div>
  );
};

export default MainLogin;
