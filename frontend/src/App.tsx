import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from './pages/home';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './lib/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="*" Component={Layout}>
          <Route path="" Component={Home} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
