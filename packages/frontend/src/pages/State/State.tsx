import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Delete_Icon, Edit_Icon, State_Icon } from '../../assets/icons';
import ConfirmationBox from '../../components/ConfirmationBox/ConfirmationBox';
import Popup from '../../components/Popup/Popup';
import { toast } from '../../store/actions/toast.action';
import { PageTitle } from '../../styled/Global.Styled';
import { API } from '../../utils/axios.config';

// Define types
export type IState = {
  _id: number;
  stateName: string;
  stateCode: string;
  status: string;
};

type SortDirection = 'asc' | 'desc';

const State: React.FC = () => {
  const [data, setData] = useState<IState[]>([]);
  const [open, setOpen] = useState({ id: 0, state: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>('stateName');
  const [orderDirection, setOrderDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data from the server
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await API.get(`${process.env.REACT_APP_BACKEND_BASE_URL}states`, {
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
  }, [orderBy, orderDirection, searchTerm]); // Re-fetch on sort changes

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleEdit = (id: number) => {
    navigate(`/state/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    setOpen({ id, state: true });
  };

  const onConfirm = async () => {
    try {
      await API.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}states/${open.id}`);
      dispatch(toast('Deleted Successfully', true, 3000, 'success'));
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
        <Grid item width={'140px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <State_Icon height={'40px'} />
          <PageTitle>State</PageTitle>
        </Grid>
        <Grid item md>
          <TextField fullWidth size='small' variant='outlined' placeholder='Search by state name or code' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Grid>
        <Grid item width={'150px'} textAlign={'end'}>
          <Button sx={{ whiteSpace: 'nowrap' }} variant='contained' color='primary' startIcon={<AddIcon />} onClick={() => navigate('/state/add')}>
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
                  <TableSortLabel active={orderBy === 'stateName'} direction={orderBy === 'stateName' ? orderDirection : 'asc'} onClick={() => handleSort('stateName')}>
                    State Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'stateCode'} direction={orderBy === 'stateCode' ? orderDirection : 'asc'} onClick={() => handleSort('stateCode')}>
                    State Code
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
                    <TableCell>{row.stateName}</TableCell>
                    <TableCell>{row.stateCode}</TableCell>
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

export default State;
