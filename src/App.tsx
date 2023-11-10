import React from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { MAIN_ROUTE } from './utils/const'

function App (): React.ReactNode {
  return (
      <div className='App'>
          <Routes>
              {routes.map(route => (
                  <Route
                      path={route.path}
                      element={route.element}
                      key={route.path}
                  />
              ))}
              <Route
                  path="*"
                  element={<Navigate to={MAIN_ROUTE} replace/>}
                  key={MAIN_ROUTE}
              />
          </Routes>
      </div>
  )
}

export default App
