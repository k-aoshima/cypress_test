import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import MyPage from "./MyPage";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path={`/register/`} element={<Register />} />
          <Route path={`/login/`} element={<Login />} />
          <Route path={`/`} element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;