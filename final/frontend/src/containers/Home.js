import * as React from 'react';
import AppAppBar from '../views/AppAppbar';
import AppFooter from '../components/AppFooter';
import withRoot from '../withRoot';
import SmokingHero from '../views/SmokingHero';
import HomeCover from '../views/HomeCover';
import HowItWorks from '../views/HowItWorks';
import {Box} from '@material-ui/core';
import HeroLayout from '../views/HeroLayout';

function Index () {
  return (
    <React.Fragment>
      <AppAppBar />
      <Box bgcolor="rgba(255,117,160,0.15)"><HomeCover /></Box>

      <Box bgcolor="#FEFEFE">
        <HowItWorks />
      </Box>

      <Box bgcolor="rgba(255,25,255,0.05)">
        <HeroLayout
          sxBackground={{
            backgroundImage: `url(https://images.unsplash.com/photo-1513346940221-6f673d962e97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
          }}
        >
          <SmokingHero />
        </HeroLayout>
      </Box>
      <Box bgcolor="rgba(230,221,196,1)">
        <AppFooter />
      </Box>
    </React.Fragment>
  );
}

export default withRoot (Index);
