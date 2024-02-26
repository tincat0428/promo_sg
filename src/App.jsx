import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./assets/fonts/icomoon/style.css";
import './assets/scss/app.scss'
import Forbidden from './page/Forbidden'
import Promo from './page/Promo';
import Catalog from './page/Catalog';
import { ThemeContext } from './store/theme-context';
import { withTranslation } from "react-i18next";
import './service/i18n'

function App() {
  const [themeCode, setThemeCode] = useState('');

  useEffect(() => {
    if (themeCode) {
      document.documentElement.setAttribute('theme', themeCode);
      document.getElementById("root").setAttribute('theme', themeCode);
    }
  }, [themeCode])

  return (
    <ThemeContext.Provider value={{ themeCode, setThemeCode }} >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Forbidden />} />
            <Route path="/:slug" element={<Promo />} />
            <Route path="/doucumentFiles" element={<Catalog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default withTranslation()(App)
