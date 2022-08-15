import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';

import Layout from '@c/Layout/';
import { Home, Profile, Contacts } from '@c/Routes';

const Router = () => (
  <BrowserRouter>
    <Layout variant="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
