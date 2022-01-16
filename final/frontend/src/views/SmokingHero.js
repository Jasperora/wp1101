import * as React from 'react';
import {Container, styled} from '@material-ui/core';
import Typography from '../components/Typography';

const Slogane = styled ('p') (({theme}) => ({
  color: theme.palette.common.white,
}));

function SmokingHero () {
  return (
    <Container
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 9,
      }}
    >

      <Typography variant="h3" component="span">
        <Slogane>You should give it a try.</Slogane>
      </Typography>
    </Container>
  );
}

export default SmokingHero;
