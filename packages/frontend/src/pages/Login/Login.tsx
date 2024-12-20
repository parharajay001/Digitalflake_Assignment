import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, FormControl, FormLabel, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { BGImage, LoginLogo } from '../../assets/images';
import Popup from '../../components/Popup/Popup';
import { setAccessToken } from '../../utils/helper';
import { loginUser } from '../../utils/service';
import { toast } from '../../store/actions/toast.action';

const useStyles = makeStyles((theme) => ({
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDecoration: {
    color: '#6e6e73',
    fontSize: '16px',
    textDecoration: 'none',
  },
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    background: '#5C218B33',
    position: 'relative',
  },
  innerLoginContainer: {
    padding: '32px 24px 40px 24px',
    textAlign: 'center',
    borderRadius: '5px',
    maxWidth: '95vw',
    width: '400px',
    position: 'absolute',
    top: '20%',
    left: '20%',
    // transform: 'translateX(-50%) translateY(-50%)',
  },
}));

export interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    userName: yup.string().email().required(),
    password: yup
      .string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/, 'At least one letter, one number and one special character'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (payload) => {
      setDisabled(true);
      loginUser({
        email: payload.userName,
        password: payload.password,
      })
        .then((res: any) => {
          if (res.status === 200) {
            setAccessToken(res?.data?.token);
            setTimeout(() => {
              setDisabled(false);
              dispatch(toast('Login successful!', true, 3000, 'success'));
              navigate('/home');
            }, 0);
          } else {
            setDisabled(false);
            dispatch(toast('The username or password is incorrect!', true, 2000, 'error'));
          }
        })
        .catch((err) => {
          dispatch(toast('Someting went wrong!', true, 2000, 'error'));
          setDisabled(false);
          console.log(err);
        });
    },
  });

  return (
    <Grid className={classes.loginContainer}>
      <img src={BGImage} style={{ position: 'absolute', zIndex: -1, height: '100%' }} />
      <form onSubmit={formik.handleSubmit}>
        <Grid className={classes.innerLoginContainer} sx={{ bgcolor: 'common.white' }}>
          <Grid className={classes.alignCenter}>
            <img src={LoginLogo} alt='profile' width={150} />
          </Grid>
          <Grid>
            <Typography sx={{ pb: 6, lineHeight: '36px', fontSize: '16px', fontWeight: 400, color: '#868686' }}>Welcome to a Digitalflake admin</Typography>
          </Grid>
          <Grid sx={{ mt: 2 }}>
            <TextField
              variant='outlined'
              color='secondary'
              fullWidth
              InputLabelProps={{ shrink: true }}
              id='userName'
              name='userName'
              label='Email-Id'
              placeholder='Enter Email Address'
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={Boolean(formik?.errors?.userName)}
              helperText={formik?.errors?.userName}
              size='small'
            />
          </Grid>
          <Grid sx={{ mt: 5 }}>
            <Stack direction={'row'} sx={{ position: 'relative' }}>
              <TextField
                variant='outlined'
                color='secondary'
                fullWidth
                InputLabelProps={{ shrink: true }}
                id='password'
                name='password'
                label='Password'
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(formik?.errors?.password)}
                helperText={formik?.errors?.password}
                size='small'
              />
              <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} sx={{ position: 'absolute', top: 0, right: 0 }}>
                {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
            </Stack>
          </Grid>
          <Grid sx={{ mt: 2, textAlign: 'right' }}>
            <FormControl color='secondary'>
              <Link
                to=''
                onClick={() => {
                  setOpen(true);
                }}
                className={classes.noDecoration}
              >
                Forgot Password?
              </Link>
            </FormControl>
          </Grid>
          <Grid sx={{ mt: 10 }}>
            <Button disabled={disabled} variant='contained' type='submit' fullWidth color='primary'>
              {disabled ? 'Loading' : 'Log In'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Popup
        open={open}
        close={() => {
          setOpen(false);
        }}
        dialogId='popup'
        width={{ xs: '90%', lg: '650px', sm: '650px' }}
        sx={{borderRadius:'10px'}}
      >
        <Grid container>
          <Grid item xs={12} md={12} p={1.5} m={0} textAlign={'center'}>
            <Typography variant='h6' color='primary'>
              {'Did you forget password?'}
            </Typography>
            <Typography color='#8F8F8F'>{'Enter your email address and we’ll send you a link to restore password'}</Typography>
          </Grid>
          <Grid item xs={12} md={12} px={'20%'} py={1.5}>
            <FormLabel>Email Address</FormLabel>
            <TextField
              variant='outlined'
              color='secondary'
              fullWidth
              InputLabelProps={{ shrink: true }}
              id='userName'
              name='userName'
              placeholder='Enter Email Address'
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={Boolean(formik?.errors?.userName)}
              helperText={formik?.errors?.userName}
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={12} px={'20%'} py={2}>
            <Button size='large' variant='contained' type='submit' fullWidth>
              Request reset link
            </Button>
          </Grid>
          <Grid item xs={12} md={12} py={2} textAlign={'center'}>
            <Link
              to={''}
              onClick={() => {
                setOpen(false);
              }}
              style={{ textDecoration: 'none' }}
            >
              <Typography color='#8F8F8F' display={'inline'} borderBottom={'1px solid #8F8F8F'}>
                Back to log in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Popup>
    </Grid>
  );
};

export default Login;
