import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API } from '../../../utils/axios.config';
import { PageTitle, RoundButton, RoundButtonSecondary } from '../../../styled/Global.Styled';
import { toast } from '../../../store/actions/toast.action';
import { useDispatch } from 'react-redux';

interface StateData {
  id?: string;
  stateName: string;
  stateCode: string;
  status: string; // "Active" or "Inactive"
}

const AddState: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the state ID from the URL

  const [stateData, setStateData] = useState<StateData>({
    stateName: '',
    stateCode: '',
    status: '',
  });

  const [error, setError] = useState({ stateName: false, stateCode: false });

  // Mock API call to fetch state details
  useEffect(() => {
    const onMount = async () => {
      if (id) {
        // Replace this with actual API call
        const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}states/${id}`);
        const { data } = response;
        setStateData({ ...data, status: data.status ? 'Active' : 'Inactive' });
      }
    };
    onMount();
  }, [id]);

  const handleSave = async () => {
    try {
      if (!stateData.stateName || !stateData.stateCode) {
        setError({
          stateName: !stateData.stateName,
          stateCode: !stateData.stateCode,
        });
        return;
      }
      // Mock API call or validation
      const payload = {
        stateName: stateData.stateName,
        stateCode: stateData.stateCode,
        status: stateData.status === 'Active' ? true : false,
      };
      if (id) {
        await API.put(`${process.env.REACT_APP_BACKEND_BASE_URL}states/${id}`, payload);
      } else {
        await API.post(`${process.env.REACT_APP_BACKEND_BASE_URL}states`, payload);
      }
      dispatch(toast('Saved Successfully', true, 3000, 'success'));

      // Navigate back to the list
      navigate(-1);
    } catch (error) {
      console.log(error);
      dispatch(toast('Someting went wrong!', true, 3000, 'success'));
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 200px)' }} position={'relative'}>
      {/* Header */}
      <Box display='flex' alignItems='center' marginBottom={3}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <PageTitle>{id ? 'Edit State' : 'Add State'}</PageTitle>
      </Box>

      {/* Form */}
      <Box component='form' noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: { height: '48px' } }}
              label='State Name'
              variant='outlined'
              value={stateData.stateName}
              onChange={(e) => setStateData({ ...stateData, stateName: e.target.value })}
              error={error.stateName}
              helperText={error.stateName && 'State Name is required'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}              
              InputProps={{ sx: { height: '48px' } }}
              label='State Code'
              variant='outlined'
              value={stateData.stateCode}
              onChange={(e) => setStateData({ ...stateData, stateCode: e.target.value })}
              error={error.stateCode}
              helperText={error.stateCode && 'State Code is required'}
            />
          </Grid>
          {id ? (
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select sx={{ height: '48px' }} value={stateData.status} label='Status' onChange={(e) => setStateData({ ...stateData, status: e.target.value })}>
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

export default AddState;
