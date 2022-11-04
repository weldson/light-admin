import Painel from 'layouts';
import { Bags } from 'pages/Bags';
import { Categories } from 'pages/Categories';
import { Home } from 'pages/Home';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { BagsContextProvider } from 'services/bags/bags.context';
import { CategoriesContextProvider } from 'services/categories/categories.context';

import './App.css';

export default function App() {
  return (
    <CategoriesContextProvider>
      <BagsContextProvider>
        <Router>
          <Painel>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/bags" element={<Bags />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Painel>
        </Router>
      </BagsContextProvider>
    </CategoriesContextProvider>
  );
}
