import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // 1. Importar
import './index.css';

// 2. Importar suas "páginas"
import App from './App.jsx'; 
import CatalogoVeiculos from './pages/CatalogoVeiculos.jsx'; 

// 3. Criar o "Diretório" (as rotas)
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
  },
  {
    path: "/catalog",
    element: <CatalogoVeiculos />,
  }
]);

// 4. Entregar o diretório 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
);