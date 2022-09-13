import React, { lazy, Suspense, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { SessionStoreContext } from '@store';
import { Home, Profile, Contacts, Payment, Auth } from '@c/Routes';

const ProtectedRoute = observer(() => {
  const { token } = useContext(SessionStoreContext);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
});

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home tab="purchases" />} />
        <Route path="shops" element={<Home tab="shops" />} />
        <Route path="pay/:id" element={<Payment />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>

      <Route path="auth" element={<Auth />} />

      <Route
        path="*"
        element={
          <div className="container">
            <h2>404 Not Found</h2>
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
