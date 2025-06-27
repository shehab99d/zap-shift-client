import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './Router/Router.jsx';
import { RouterProvider } from "react-router";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import 'leaflet/dist/leaflet.css';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  const queryClient = new QueryClient();

  return (
    <div className='font-urbanist max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
