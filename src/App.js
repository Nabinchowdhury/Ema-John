import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Layout/Main';
import Login from './components/LoginPage/Login';
import Signup from './components/SignupPage/Signup';
import Order from './components/Order/Order';
import { ProductsAndCartLoader } from './components/ProductsAndCartLoader/ProductsAndCartLoader';
import Shop from './components/Shop/Shop'
import Shipping from './components/Shipping/Shipping';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: ProductsAndCartLoader,
          element: <Shop></Shop>,
        },
        {
          path: "/shop",
          loader: ProductsAndCartLoader,
          element: <Shop></Shop>,
        },
        {
          path: "/order",
          loader: ProductsAndCartLoader,
          element: <Order></Order>,
        },
        {
          path: "/inventory",
          element: <h1>This is Inventory</h1>,
        },
        {
          path: "/about",
          element: <h1>This is about</h1>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Signup></Signup>,
        },
        {
          path: "/shipping",
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>,
        },
      ]
    }
  ])

  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
