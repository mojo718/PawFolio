import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import './index.css'
import Events from './components/events.jsx';

import App from './App.jsx'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Profile from './pages/profile.jsx'
import HealthJournal from './pages/healthJournal.jsx';
import Footer from './components/footer.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/profile',
        element: <Profile />
      }, 
      {
        path: '/health/:petId',
        element: <HealthJournal />
      },
      {
        path: '/events/:petId',
        element: <Events />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
