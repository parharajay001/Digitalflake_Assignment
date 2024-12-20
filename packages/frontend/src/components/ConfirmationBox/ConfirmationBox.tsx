import { Box, Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Danger_Icon } from '../../assets/icons';
import { RoundButton, RoundButtonSecondary} from '../../styled/Global.Styled';

const ConfirmationBox: FC<{ MainTitle: string; Title: string; cancleCallback: Function; confirmCallback: Function }> = ({ MainTitle, Title, cancleCallback, confirmCallback }) => {
  return (
    <Grid container mt={'20px'} height={'292px'}>
      <Grid item xs={12} md={12} p={1.5} m={0} display={'flex'} justifyContent={'center'} textAlign={'center'} alignItems={'center'}>
        <Danger_Icon />
        <Typography fontSize={'32px'} fontWeight={'bold'} ml={'20px'}>
          {MainTitle}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} p={1.5} m={0} textAlign={'center'}>
        <Typography fontSize={'24px'} color='#8F8F8F'>
          {Title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} p={1.5} m={0} textAlign={'center'}>
        <Box display='flex' justifyContent='center' marginTop={4} gap={6}>
          <RoundButtonSecondary
            size='large'
            variant='outlined'
            onClick={() => {
              cancleCallback();
            }}
          >
            Cancel
          </RoundButtonSecondary>
          <RoundButton
            size='large'
            variant='contained'
            color='primary'
            onClick={() => {
              confirmCallback();
            }}
          >
            Confirm
          </RoundButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConfirmationBox;
