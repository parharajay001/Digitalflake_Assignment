import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API } from '../../../utils/axios.config';
import { PageTitle, RoundButton, RoundButtonSecondary } from '../../../styled/Global.Styled';
import { toast } from '../../../store/actions/toast.action';
import { useDispatch } from 'react-redux';

interface WarehouseData {
  _id?: string;
  warehouseName: string;
  stateId: string; // ID of the associated state
  cityId: string; // ID of the associated city
  status: string; // "Active" or "Inactive"
}

interface State {
  _id: string;
  stateName: string;
}

interface City {
  _id: string;
  cityName: string;
}

const AddWarehouse: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the warehouse ID from the URL

  const [warehouseData, setWarehouseData] = useState<WarehouseData>({
    warehouseName: '',
    stateId: '',
    cityId: '',
    status: '',
  });

  const [states, setStates] = useState<State[]>([]); // List of states for dropdown
  const [cities, setCities] = useState<City[]>([]); // List of cities for dropdown
  const [error, setError] = useState({ warehouseName: false, stateId: false, cityId: false });

  // Fetch all states for the dropdown
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}states`);
        setStates(response.data);
      } catch (err) {
        console.error('Failed to fetch states:', err);
        dispatch(toast('Something went wrong!', true, 3000, 'error'));
      }
    };
    fetchStates();
  }, []);

  // Fetch cities for the selected state
  useEffect(() => {
    const fetchCities = async () => {
      if (!warehouseData.stateId) return;
      try {
        const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}cities`, {
          params: { stateId: warehouseData.stateId },
        });
        setCities(response.data);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
        dispatch(toast('Something went wrong!', true, 3000, 'error'));
      }
    };
    fetchCities();
  }, [warehouseData.stateId]);

  // Fetch warehouse details if editing
  useEffect(() => {
    const onMount = async () => {
      if (id) {
        try {
          const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}warehouses/${id}`);
          const { data } = response;
          setWarehouseData({
            ...data,
            status: data.status ? 'Active' : 'Inactive',
            stateId: data.state._id,
            cityId: data.city._id,
          });
        } catch (err) {
          console.error('Failed to fetch warehouse details:', err);
          dispatch(toast('Something went wrong!', true, 3000, 'error'));
        }
      }
    };
    onMount();
  }, [id]);

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!warehouseData.warehouseName || !warehouseData.stateId || !warehouseData.cityId) {
        setError({
          warehouseName: !warehouseData.warehouseName,
          stateId: !warehouseData.stateId,
          cityId: !warehouseData.cityId,
        });
        return;
      }

      const payload = {
        warehouseName: warehouseData.warehouseName,
        stateId: warehouseData.stateId,
        cityId: warehouseData.cityId,
        status: warehouseData.status === 'Active' ? true : false,
      };

      let response = null;
      if (id) {
        response = await API.put(`${process.env.REACT_APP_BACKEND_BASE_URL}warehouses/${id}`, payload);
      } else {
        response = await API.post(`${process.env.REACT_APP_BACKEND_BASE_URL}warehouses`, payload);
      }
      dispatch(toast('Saved Successfully!', true, 3000, 'success'));
      // Navigate back to the list
      navigate(-1);
    } catch (error) {
      console.error('Error saving warehouse:', error);
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
        <PageTitle>{id ? 'Edit Warehouse' : 'Add Warehouse'}</PageTitle>
      </Box>

      {/* Form */}
      <Box component='form' noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: { height: '48px' } }}
              label='Warehouse Name'
              variant='outlined'
              value={warehouseData.warehouseName}
              onChange={(e) => setWarehouseData({ ...warehouseData, warehouseName: e.target.value })}
              error={error.warehouseName}
              helperText={error.warehouseName && 'Warehouse Name is required'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select sx={{ height: '48px' }} value={warehouseData.stateId} onChange={(e) => setWarehouseData({ ...warehouseData, stateId: e.target.value })} error={error.stateId}>
                {states.map((state) => (
                  <MenuItem key={state._id} value={state._id}>
                    {state.stateName}
                  </MenuItem>
                ))}
              </Select>
              {error.stateId && <Typography color='error'>State is required</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select sx={{ height: '48px' }} value={warehouseData.cityId} onChange={(e) => setWarehouseData({ ...warehouseData, cityId: e.target.value })} error={error.cityId}>
                {cities.map((city) => (
                  <MenuItem key={city._id} value={city._id}>
                    {city.cityName}
                  </MenuItem>
                ))}
              </Select>
              {error.cityId && <Typography color='error'>City is required</Typography>}
            </FormControl>
          </Grid>
          {id ? (
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select sx={{ height: '48px' }} value={warehouseData.status} label='Status' onChange={(e) => setWarehouseData({ ...warehouseData, status: e.target.value })}>
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

export default AddWarehouse;
