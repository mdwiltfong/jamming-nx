import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromChildren,
} from 'react-router-dom';
import App from './app/app';
import NavBar from './app/components/NavBar';
import LoginPage from './app/components/LoginPage';
import Profile from './app/components/Profile';
const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<NavBar />}>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
