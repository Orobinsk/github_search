import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import FavoritesStore from "./store/FavoritesStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Context = createContext<{ favorites: FavoritesStore | null }>({ favorites: null })

root.render(
  <React.StrictMode>
      <Context.Provider value={{
          favorites: new FavoritesStore()
      }}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
