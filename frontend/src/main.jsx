import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MicarProvider from './context/MicarProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MicarProvider>
      <App />
    </MicarProvider>
  </React.StrictMode>,
)
