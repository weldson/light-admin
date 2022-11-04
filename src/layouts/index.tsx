import React from 'react';

import './styles.css';

import { ToastContainer } from 'react-toastify';
import { Sidebar } from '../components/Sidebar';
import { NavbarComponent } from '../components/NavbarComponent';

interface PainelProps {
  children: React.ReactNode;
}

const Painel = ({ children }: PainelProps) => {
  return (
    <>
      <NavbarComponent />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Painel;
