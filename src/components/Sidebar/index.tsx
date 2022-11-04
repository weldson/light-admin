import React from 'react';
import { MdHome } from 'react-icons/md';
import {
  IoHome,
  IoPeople,
  IoCart,
  IoCash,
  IoBagHandle,
  IoPricetags,
} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { Item } from './Item';
import './styles.css';
import { ItemActive } from './ItemActive';

const Sidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              {({ isActive }) =>
                isActive ? (
                  <ItemActive text="Dashboard">
                    <IoHome size={16} color="#fff" />
                  </ItemActive>
                ) : (
                  <Item text="Dashboard">
                    <IoHome size={16} color="#4fd1c5" />
                  </Item>
                )
              }
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/orders">
              {({ isActive }) =>
                isActive ? (
                  <ItemActive text="Vendas">
                    <IoCash size={16} color="#fff" />
                  </ItemActive>
                ) : (
                  <Item text="Vendas">
                    <IoCash size={16} color="#4fd1c5" />
                  </Item>
                )
              }
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              {({ isActive }) =>
                isActive ? (
                  <ItemActive text="Produtos">
                    <IoBagHandle size={16} color="#fff" />
                  </ItemActive>
                ) : (
                  <Item text="Produtos">
                    <IoBagHandle size={16} color="#4fd1c5" />
                  </Item>
                )
              }
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
              {({ isActive }) =>
                isActive ? (
                  <ItemActive text="Categorias">
                    <IoPricetags size={16} color="#fff" />
                  </ItemActive>
                ) : (
                  <Item text="Categorias">
                    <IoPricetags size={16} color="#4fd1c5" />
                  </Item>
                )
              }
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/providers">
              {({ isActive }) =>
                isActive ? (
                  <ItemActive text="Fornecedores">
                    <IoCart size={16} color="#fff" />
                  </ItemActive>
                ) : (
                  <Item text="Fornecedores">
                    <IoCart size={16} color="#4fd1c5" />
                  </Item>
                )
              }
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              {({ isActive }) =>
                isActive ? (
                  <ItemActive text="Clientes">
                    <IoPeople size={16} color="#fff" />
                  </ItemActive>
                ) : (
                  <Item text="Clientes">
                    <IoPeople size={16} color="#4fd1c5" />
                  </Item>
                )
              }
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Sidebar };
