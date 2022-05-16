import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@app/contexts/AuthProvider';
import { default as Routes } from '@app/routes/BrowserRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
