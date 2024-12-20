import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API } from '../../../utils/axios.config';
import { PageTitle, RoundButton, RoundButtonSecondary } from '../../../styled/Global.Styled';
import { toast } from '../../../store/actions/toast.action';
import { useDispatch } from 'react-redux';

interface CityData {
  _id?: string;
  cityName: string;
  cityCode: string;
  stateId: string; // ID of the associated state
  status: string; // "Active" or "Inactive"
}

interface State {
  _id: string;
  stateName: string;
}

const AddCity: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the city ID from the URL

  const [cityData, setCityData] = useState<CityData>({
    cityName: '',
    cityCode: '',
    stateId: '',
    status: '',
  });

  const [states, setStates] = useState<State[]>([]); // List of states for dropdown
  const [error, setError] = useState({ cityName: false, cityCode: false, stateId: false });

  // Fetch all states for the dropdown
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}states`);
        setStates(response.data);
      } catch (err) {
        console.error('Failed to fetch states:', err);
      }
    };
    fetchStates();
  }, []);

  // Fetch city details if editing
  useEffect(() => {
    const onMount = async () => {
      if (id) {
        try {
          const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}cities/${id}`);
          const { data } = response;
          setCityData({ ...data, status: data.status ? 'Active' : 'Inactive', stateId: data.state._id });
        } catch (err) {
          console.error('Failed to fetch city details:', err);
        }
      }
    };
    onMount();
  }, [id]);

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!cityData.cityName || !cityData.cityCode || !cityData.stateId) {
        setError({
          cityName: !cityData.cityName,
          cityCode: !cityData.cityCode,
          stateId: !cityData.stateId,
        });
        return;
      }

      const payload = {
        cityName: cityData.cityName,
        cityCode: cityData.cityCode,
        stateId: cityData.stateId,
        status: cityData.status === 'Active' ? true : false,
      };

      let response = null;
      if (id) {
        response = await API.put(`${process.env.REACT_APP_BACKEND_BASE_URL}cities/${id}`, payload);
      } else {
        response = await API.post(`${process.env.REACT_APP_BACKEND_BASE_URL}cities`, payload);
      }
      dispatch(toast('Saved Successfully!', true, 3000, 'success'));
      // Navigate back to the list
      navigate(-1);
    } catch (error) {
      console.error('Error saving city:', error);
      dispatch(toast('Something went wrong!', true, 3000, 'error'));
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 200px)' }} position={'relative'}>
      {/* Header */}
      <Box display='flex' alignItems='center' marginBottom={3}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <PageTitle>{id ? 'Edit City' : 'Add City'}</PageTitle>
      </Box>

      {/* Form */}
      <Box component='form' noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: { height: '48px' } }}
              label='City Name'
              variant='outlined'
              value={cityData.cityName}
              onChange={(e) => setCityData({ ...cityData, cityName: e.target.value })}
              error={error.cityName}
              helperText={error.cityName && 'City Name is required'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: { height: '48px' } }}
              label='City Code'
              variant='outlined'
              value={cityData.cityCode}
              onChange={(e) => setCityData({ ...cityData, cityCode: e.target.value })}
              error={error.cityCode}
              helperText={error.cityCode && 'City Code is required'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select sx={{ height: '48px' }} value={cityData.stateId} onChange={(e) => setCityData({ ...cityData, stateId: e.target.value })} error={error.stateId}>
                {states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>
                    {state.stateName}
                  </MenuItem>
                ))}
              </Select>
              {error.stateId && <Typography color='error'>State is required</Typography>}
            </FormControl>
          </Grid>
          {id ? (
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select sx={{ height: '48px' }} value={cityData.status} label='Status' onChange={(e) => setCityData({ ...cityData, status: e.target.value })}>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : null}
        </Grid>
      </Box>
      {/* Actions */}
      <Box display='flex' justifyContent='flex-end' marginTop={4} gap={2} position={'absolute'} sx={{ bottom: 0, right: 0 }}>
        <RoundButtonSecondary variant='outlined' onClick={() => navigate(-1)}>
          Cancel
        </RoundButtonSecondary>
        <RoundButton variant='contained' color='primary' onClick={handleSave}>
          Save
        </RoundButton>
      </Box>
    </Box>
  );
};

export default AddCity;
