import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Favourites from "./components/Favourites";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
          <Route index element={<HomeScreen />} />
          <Route path="favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
