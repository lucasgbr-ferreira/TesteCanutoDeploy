// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import './index.css';

// 1. Importar suas "páginas"
import App from './App.jsx'; 
import EstoqueVeiculos from './pages/EstoqueVeiculos.jsx';   
import CatalogoVeiculos from './pages/CatalogoVeiculos.jsx'; // ← ADICIONE ESTA IMPORT

// 2. Criar o "Diretório" (as rotas)
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
  },
  {
    path: "/dashboard/estoque",
    element: <EstoqueVeiculos />,
  },
  {
    path: "/catalog",
    element: <CatalogoVeiculos />,
  },
]);

// 3. Entregar o diretório 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
);