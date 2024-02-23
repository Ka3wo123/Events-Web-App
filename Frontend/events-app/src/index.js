import React from "react"
import ReactDOM from "react-dom/client"
import MainPage from "./components/MainPage"
import App from "./App"
import LoginPage from "./components/LoginPage"
import AddEventPage from "./components/AddEventPage"
import DeleteEventPage from "./components/DeleteEventPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/home' element={<MainPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path ='/add-event' element={<AddEventPage/>}/>
          <Route path='/delete-event' element={<DeleteEventPage/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
