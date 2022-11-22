import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Painel from 'layouts';

import { Bags } from 'pages/Bags';
import { Categories } from 'pages/Categories';
import { Cities } from 'pages/Cities';
import { Home } from 'pages/Home';
import { States } from 'pages/States';
import { Payments } from 'pages/Payments';
import { CompaniesSize } from 'pages/CompaniesSize';
import { Customers } from 'pages/Customers';
import { Providers } from 'pages/Providers';

export const RoutesAdmin = () => (
  <Router>
    <Painel>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/companies-size" element={<CompaniesSize />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/states" element={<States />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Painel>
  </Router>
);
