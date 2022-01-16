import * as React from 'react';
import {Box, Grid, Container} from '@material-ui/core';
import Typography from '../components/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function HowItWorks () {
  return (
    <Box
      component="section"
      sx={{display: 'flex', overflow: 'hidden', m: '140px 10px'}}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{mb: 14}}>
          How can it help you?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box m={5}><AssignmentIcon fontSize="large" /></Box>
                <Typography variant="h5" align="center">
                  This tool help you arrange your massive to-do tasks.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box m={5}><LeaderboardIcon fontSize="large" /></Box>
                <Typography variant="h5" align="center">
                  With the help of algorithms, time saved, that is, better working efficiency.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box m={5}><AccessibilityNewIcon fontSize="large" /></Box>
                <Typography variant="h5" align="center">
                  It's easy to launch new events to anyone you want.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default HowItWorks;
