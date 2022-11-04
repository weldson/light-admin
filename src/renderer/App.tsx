import Painel from 'layouts';
import { Categories } from 'pages/Categories';
import { Home } from 'pages/Home';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CategoriesContextProvider } from 'services/categories/categories.context';

import './App.css';

export default function App() {
  return (
    <CategoriesContextProvider>
      <Router>
        <Painel>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Painel>
      </Router>
    </CategoriesContextProvider>
  );
}
