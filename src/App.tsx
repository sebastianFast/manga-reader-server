import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./Components/pages/home";
import Login from "./Components/pages/login";
import Register from "./Components/pages/register";
import MenuBar from "./Components/menu-bar";
import {AuthProvider} from "./Components/context/auth"
import SinglePost from "./Components/pages/single-post"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <MenuBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:postId" element={<SinglePost />} />
        </Routes>
      </Container>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
