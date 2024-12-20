import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { City_Icon, Danger_Icon, Delete_Icon, Edit_Icon } from '../../assets/icons';
import Popup from '../../components/Popup/Popup';
import { PageTitle } from '../../styled/Global.Styled';
import { API } from '../../utils/axios.config';
import { IState } from '../State/State';
import { toast } from '../../store/actions/toast.action';
import { useDispatch } from 'react-redux';
import ConfirmationBox from '../../components/ConfirmationBox/ConfirmationBox';

// Define types
export type ICity = {
  _id: number;
  cityName: string;
  cityCode: string;
  state: IState;
  status: string;
};

type SortDirection = 'asc' | 'desc';

const City: React.FC = () => {
  const [data, setData] = useState<ICity[]>([]);
  const [open, setOpen] = useState({ id: 0, state: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>('cityName');
  const [orderDirection, setOrderDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data from the server
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}cities`, {
        params: {
          sortField: orderBy,
          sortOrder: orderDirection,
          search: searchTerm,
        },
      });
      setData(response.data);
    } catch (err) {
      dispatch(toast('Something went wrong!', true, 3000, 'error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderBy, orderDirection, searchTerm]); // Re-fetch on sort or search changes

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleEdit = (id: number) => {
    navigate(`/city/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    setOpen({ id, state: true });
  };

  const onConfirm = async () => {
    try {
      await API.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}cities/${open.id}`);
      dispatch(toast('Deleted Successfully!', true, 3000, 'success'));
      setOpen({ id: 0, state: false });
      fetchData(); // Re-fetch after delete
    } catch (err: any) {
      dispatch(toast(err?.response?.data?.message ? err.response.data.message : 'Something went wrong!', true, 3000, 'error'));
    }
  };

  return (
    <Box>
      {/* Header */}
      <Grid container spacing={2} marginBottom={2}>
        <Grid item width={'120px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <City_Icon height={'40px'} />
          <PageTitle>City</PageTitle>
        </Grid>
        <Grid item md>
          <TextField fullWidth size='small' variant='outlined' placeholder='Search by city name or code' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Grid>
        <Grid item width={'150px'} textAlign={'end'}>
          <Button sx={{ whiteSpace: 'nowrap' }} variant='contained' color='primary' startIcon={<AddIcon />} onClick={() => navigate('/city/add')}>
            Add New
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper}>
        {loading ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='200px'>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='200px'>
            <Typography color='error'>{error}</Typography>
          </Box>
        ) : (
          <Table size='small'>
            <TableHead sx={{ background: '#F4EDAF', height: '60px' }}>
              <TableRow>
                <TableCell>
                  <TableSortLabel active={orderBy === '_id'} direction={orderBy === '_id' ? orderDirection : 'asc'} onClick={() => handleSort('_id')}>
                    Id
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'cityName'} direction={orderBy === 'cityName' ? orderDirection : 'asc'} onClick={() => handleSort('cityName')}>
                    City Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'cityCode'} direction={orderBy === 'cityCode' ? orderDirection : 'asc'} onClick={() => handleSort('cityCode')}>
                    City Code
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'stateName'} direction={orderBy === 'stateName' ? orderDirection : 'asc'} onClick={() => handleSort('stateName')}>
                    State Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'status'} direction={orderBy === 'status' ? orderDirection : 'asc'} onClick={() => handleSort('status')}>
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <>
                  <TableRow key={row._id} sx={{ background: '#fff' }}>
                    <div style={{ height: '15px' }}></div>
                  </TableRow>
                  <TableRow key={row._id} sx={{ background: '#F2F2F2', height: '60px' }}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.cityName}</TableCell>
                    <TableCell>{row.cityCode}</TableCell>
                    <TableCell>{row.state.stateName}</TableCell>
                    <TableCell>
                      <Typography color={row.status ? 'green' : 'red'}>{row.status ? 'Active' : 'Inactive'}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton color='primary' onClick={() => handleEdit(row._id)}>
                        <Edit_Icon />
                      </IconButton>
                      <IconButton color='secondary' onClick={() => handleDelete(row._id)}>
                        <Delete_Icon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Popup
        open={open.state}
        close={() => {
          setOpen({ id: 0, state: false });
        }}
        dialogId='popup'
        width={{ xs: '90%', lg: '518px', sm: '518px' }}
        sx={{ borderRadius: '10px' }}
      >
        <ConfirmationBox
          MainTitle='Delete'
          Title='Are you sure you want to delete?'
          cancleCallback={() => {
            setOpen({ id: 0, state: false });
          }}
          confirmCallback={onConfirm}
        />
      </Popup>
    </Box>
  );
};

export default City;
