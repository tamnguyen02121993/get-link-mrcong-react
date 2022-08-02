import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { store } from './store'
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, ArticleDetail, ArticleList } from './pages'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path=':category/:page' element={<Home />}>
              <Route index element={<ArticleList />}></Route>
              <Route path='detail' element={<ArticleDetail />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
