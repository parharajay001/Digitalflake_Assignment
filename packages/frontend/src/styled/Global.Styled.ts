import { Button, styled, Typography } from '@mui/material';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
}));

const RoundButtonSecondary= styled(Button)(({ theme }) => ({
  color: '#6c757d',
  borderColor: '#6c757d',
  padding: '10px 40px',
  borderRadius: '25px',
}));
const RoundButton = styled(Button)(({ theme }) => ({
  padding: '10px 40px',
  borderRadius: '25px',
}));

export { PageTitle, RoundButton, RoundButtonSecondary};
