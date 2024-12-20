import * as React from 'react';
import { Box } from '@mui/system';
import { InfinitySpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const Loader: React.FC<{
  position?: any;
  show?: any;
}> = ({ position = 'fixed', show = null }) => {
  const [showLoader, setLoader] = React.useState();
  const loader = useSelector((state: any) => state.Loader.loader);

  React.useEffect(() => {
    if (show === null) {
      setLoader(loader);
    } else {
      setLoader(show);
    }
  }, [show, loader]);

  return (
    <>
      {showLoader && (
        <Box
          style={{
            position,
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        >
          <InfinitySpin />
        </Box>
      )}
    </>
  );
};

export default Loader;
