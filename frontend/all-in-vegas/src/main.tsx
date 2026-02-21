import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { LoadScript, type Libraries} from '@react-google-maps/api'
import { googleMapsAPIKey } from './global/googleMapAPI.ts'

const libraries: Libraries = ["places"];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={libraries}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LoadScript>
  </StrictMode>,
)