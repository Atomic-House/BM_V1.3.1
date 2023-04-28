import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RTLLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import BoardsLayout from "layouts/boards";
import "assets/css/Plugins.css";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="boards/*" element={<BoardsLayout />} />
      <Route path="rtl/*" element={<RTLLayout />} />
      <Route path="/" element={<Navigate to="/boards" replace />} />
    </Routes>
  );
};

export default App;
