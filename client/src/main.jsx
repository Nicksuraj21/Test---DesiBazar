// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { AppContextProvider } from './context/AppContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <AppContextProvider>
//       <App />
//     </AppContextProvider>
//   </BrowserRouter>,
// )












// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { AppContextProvider } from './context/AppContext.jsx'
// import axios from "axios";

// // 🔥 VERY IMPORTANT
// axios.defaults.withCredentials = true;

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <AppContextProvider>
//       <App />
//     </AppContextProvider>
//   </BrowserRouter>
// );







import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from "axios";

// 🔥 VERY IMPORTANT (cookies support)
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
