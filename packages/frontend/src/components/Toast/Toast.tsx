import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '../../store/actions/toast.action';

const Toast: React.FC<{ children: any }> = ({ children }) => {
  //type= success | error | warning | info
  const toastStore = useSelector((state: any) => state.Toast);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (toastStore && Object.keys(toastStore)?.length && toastStore?.msg && toastStore?.open) {
      enqueueSnackbar(toastStore?.msg, { variant: toastStore?.type });
      dispatch(toast('', false));
    }
  }, [toastStore]);

  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={toastStore?.duration} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} dense>
      {children}
    </SnackbarProvider>
  );
};

export default Toast;
