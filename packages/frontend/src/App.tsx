import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppGuard from './components/AppGuard';
import Toast from './components/Toast';
import AllRoutes from './routes/RouterConfig';
import GlobalStore from './store/GlobalStore';
import Loader from './components/Loader';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStore>
        <Loader />
        <Toast>
          <AppGuard>
            <AllRoutes />
          </AppGuard>
        </Toast>
      </GlobalStore>
    </BrowserRouter>
  );
}

export default App;
