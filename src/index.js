import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import reportWebVitals from './reportWebVitals';
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';


// const [theme, setTheme] = useState('.green')
// export const ThemeContext = createContext(null)




// document.querySelector('#cycleTheme').addEventListener('click', () => {
//   const newTheme = theme === '.green' ? '.blue' : '.green';
//   setTheme(newTheme)
//   console.log('newTheme', newTheme)
//   // const themeVar = '--theme-color';
//   // const themeColor = document.body.style.getPropertyValue(themeVar);
//   // const newThemeColor = themeColor === '#12121a' ? 'light' : '#12121a';

//   // document.body.style.setProperty(themeVar, newThemeColor)
//   // console.log('clicked', themeVar, themeColor, newThemeColor)
// })

const container = document.getElementById('root');
const appRoot = createRoot(container);
appRoot.render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>

)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// appRoot.render(<App tab="home" />)