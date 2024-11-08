import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../components/homepage/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
]);

export default router;
