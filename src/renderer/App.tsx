import { BagsContextProvider } from 'services/bags/bags.context';
import { CategoriesContextProvider } from 'services/categories/categories.context';
import { CitiesContextProvider } from 'services/cities/cities.context';
import { StatesContextProvider } from 'services/states/states.context';

import './App.css';
import { PaymentsContextProvider } from 'services/payments/payments.context';
import { CompaniesSizeContextProvider } from 'services/companies-size/companies-size..context';
import { CustomersContextProvider } from 'services/customers/customers.context';
import { RoutesAdmin } from 'routes';

export default function App() {
  return (
    <CategoriesContextProvider>
      <CustomersContextProvider>
        <CompaniesSizeContextProvider>
          <PaymentsContextProvider>
            <BagsContextProvider>
              <StatesContextProvider>
                <CitiesContextProvider>
                  <RoutesAdmin />
                </CitiesContextProvider>
              </StatesContextProvider>
            </BagsContextProvider>
          </PaymentsContextProvider>
        </CompaniesSizeContextProvider>
      </CustomersContextProvider>
    </CategoriesContextProvider>
  );
}
