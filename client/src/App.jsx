import { createBrowserRouter, RouterProvider } from 'react-router';
import { useEffect, useContext } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './features/auth/components/Login';
import { Register } from './features/auth/components/Register';
import { ProductList } from './features/products/components/ProductList';
import { ProductDetail } from './features/products/components/ProductDetail';
import { AddProduct } from './features/products/components/AddProduct';
import useAPI from './hooks/useApi';
import { MyStore } from './context/AppContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <ProductList /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> }
        ]
      },
      {
        path: "products",
        children: [
          { path: "products/:id", element: <ProductDetail /> },
          { path: "create", element: <AddProduct /> },
          { path: "update/:id", element: <AddProduct /> }
        ]
      }
    ]
  }
]);

function App() {
  const { setUser } = useContext(MyStore);
  const API = useAPI();

  useEffect(() => {
    API.get("/auth/me")
      .then(res => setUser(res.data.data.user))
      .catch(() => {});
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
