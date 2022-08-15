import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';

import { Spinner } from '@ui';
import Layout from '@c/Layout/';
import { Home, Profile, Contacts, Payment } from '@c/Routes';

const Router = () => (
  <BrowserRouter>
    <Layout variant="main">
      <Routes>
        <Route path="/" element={<Home tab="purchases" />} />
        <Route path="/shops" element={<Home tab="shops" />} />
        <Route path="/pay/:id" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
