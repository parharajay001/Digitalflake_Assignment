import { Grid, Typography } from '@mui/material';
import { LoginLogo } from '../../assets/images';

export default function Home() {
  return (
    <Grid container alignItems={'center'} height={'78vh'}>
      <Grid item md={12} textAlign={'center'}>
        <img src={LoginLogo} />
        <Typography fontSize={'24px'}>Welcome to Digitalflake admin</Typography>
      </Grid>
    </Grid>
  );
}
