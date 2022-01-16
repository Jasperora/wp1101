import * as React from 'react';
import Typography from '../components/Typography';
import HeroLayout from './HeroLayout';
import backgroundImage from '../image/HomeCover.jpg';

export default function HomeCover () {
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{display: 'none'}}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2">
        Event Allocator
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{mb: 4, mt: {sx: 4, sm: 10}}}
      >
        Need a tool to allocate your events?
        {' '}
        <strong>Event Allocator</strong>
        {' '}
        is what you're looking for.
      </Typography>
    </HeroLayout>
  );
}
