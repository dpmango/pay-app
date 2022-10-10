import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';

import {
  Auth,
  Home,
  Profile,
  ProfileSettings,
  Contacts,
  Chat,
  Payment,
  PaymentValidation,
  PaymentSuggestion,
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
      <Route path="auth" element={<Auth />} />
      <Route path="r/:id" element={<PaymentSuggestion />} />

      <Route element={<ProtectedRoute />}>
        <Route index element={<Home tab="purchases" />} />
        {/* <Route path="shops" element={<Home tab="shops" />} /> */}
        <Route path="pay/:id" element={<Payment />} />
        <Route path="pay/:id/validation" element={<PaymentValidation />} />
        <Route path="pay/processing" element={<PaymentProcessing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/settings" element={<ProfileSettings />} />
        <Route path="contacts" element={<Contacts />} />
        {/* <Route path="chat" element={<Chat />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
