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
import { Helmet, HelmetProvider } from 'react-helmet-async';
const helmetContext = {};

function App() {
  const [themeCode, setThemeCode] = useState('');

  useEffect(() => {
    if (themeCode) {
      document.documentElement.setAttribute('theme', themeCode);
      document.getElementById("root").setAttribute('theme', themeCode);
    }
  }, [themeCode])

  return (
    <HelmetProvider context={helmetContext}>
      <ThemeContext.Provider value={{ themeCode, setThemeCode }} >
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route index element={<Forbidden />} />
            <Route path="/:slug" element={<Promo />} />
            <Route path="/doucumentFiles" element={<Catalog />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </HelmetProvider>
  )
}

export default withTranslation()(App)
