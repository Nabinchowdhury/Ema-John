import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Layout/Main';
import Order from './components/Order/Order';
import { ProductsAndCartLoader } from './components/ProductsAndCartLoader/ProductsAndCartLoader';
import Shop from './components/Shop/Shop'


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
          path: "/about",
          element: <h1>This is about</h1>,
        },
        {
          path: "/inventory",
          element: <h1>This is Inventory</h1>,
        }
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
