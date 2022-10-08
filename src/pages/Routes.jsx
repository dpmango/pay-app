import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';

import {
  Auth,
  Home,
  Profile,
  ProfileSettings,
  ProfileValidation,
  Contacts,
  Chat,
  Payment,
  PaymentProcessing,
} from '@/pages';
import { SessionStoreContext } from '@/store';

import { AUTH_TOKEN_COOKIE } from '@core/enum/cookie';

const ProtectedRoute = observer(() => {
  const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);

  if (!accessToken) {
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
        <Route path="pay/processing" element={<PaymentProcessing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/validation" element={<ProfileValidation />} />
        <Route path="profile/settings" element={<ProfileSettings />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="chat" element={<Chat />} />
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
