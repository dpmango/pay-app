import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
  Auth,
  Home,
  Profile,
  ProfileSettings,
  Contacts,
  Chat,
  Payment,
  PaymentWelcome,
  PaymentNotFound,
  PaymentValidation,
  PaymentApproving,
  PaymentApproved,
  PaymentProcessing,
  PaymentSBP,
  PaymentProfileValidation,
} from '@/pages';

import { AUTH_TOKEN_COOKIE } from '@core/enum/cookie';

const ProtectedRoute = observer(() => {
  const accessToken = Cookies.get(AUTH_TOKEN_COOKIE);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
});

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="r/:id" element={<PaymentWelcome />} />
      <Route path="r/:id/notfound" element={<PaymentNotFound />} />

      <Route element={<ProtectedRoute />}>
        <Route index element={<Home tab="purchases" />} />
        {/* <Route path="shops" element={<Home tab="shops" />} /> */}
        <Route path="pay/:id" element={<Payment />} />
        <Route path="pay/:id/validation" element={<PaymentValidation />} />
        <Route path="pay/:id/profile" element={<PaymentProfileValidation />} />
        <Route path="pay/:id/approving" element={<PaymentApproving />} />
        <Route path="pay/:id/approved" element={<PaymentApproved />} />
        <Route path="pay/:id/processing" element={<PaymentProcessing />} />
        <Route path="pay/:id/sbp" element={<PaymentSBP />} />
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
