import Painel from 'layouts';

import { Bags } from 'pages/Bags';
import { Categories } from 'pages/Categories';
import { Cities } from 'pages/Cities';
import { Home } from 'pages/Home';
import { States } from 'pages/States';
import { Payments } from 'pages/Payments';

import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { BagsContextProvider } from 'services/bags/bags.context';
import { CategoriesContextProvider } from 'services/categories/categories.context';
import { CitiesContextProvider } from 'services/cities/cities.context';
import { StatesContextProvider } from 'services/states/states.context';

import './App.css';
import { PaymentsContextProvider } from 'services/payments/payments.context';

export default function App() {
  return (
    <CategoriesContextProvider>
      <PaymentsContextProvider>
        <BagsContextProvider>
          <StatesContextProvider>
            <CitiesContextProvider>
              <Router>
                <Painel>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/bags" element={<Bags />} />
                    <Route path="/states" element={<States />} />
                    <Route path="/cities" element={<Cities />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </Painel>
              </Router>
            </CitiesContextProvider>
          </StatesContextProvider>
        </BagsContextProvider>
      </PaymentsContextProvider>
    </CategoriesContextProvider>
  );
}
