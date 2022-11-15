import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';

import { Customer } from 'interfaces/Customer';
import { Header } from 'components/Header';
import { CustomersContext } from 'services/customers/customers.context';

import { AddModal } from './components/AddModal';
// import { EditModal } from './components/EditModal';

export const Customers = () => {
  const [customer, setCustomer] = useState<Customer>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { customers, removeCustomer } = useContext(CustomersContext);

  const handleEdit = async (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedCustomer: Customer) => {
    if (selectedCustomer.id) {
      await removeCustomer(selectedCustomer.id);
    }
  };

  return (
    <>
      <Header title="Clientes" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-5 col-sm-4">Nome</th>
                <th className="col-md-3 col-sm-2">Telefone</th>
                <th className="col-md-2 col-sm-3">Data de Nascimento</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="align-middle">
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.birth.toLocaleDateString('pt-BR')}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(c)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(c)}>
                      <IoMdTrash color="#5f5b5b" size={16} />
                    </CircleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </CustomCard.Body>
      </CustomCard>

      <AddModal showModal={showModalAdd} setShowModal={setShowModalAdd} />

      {/* <EditModal
        state={state}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      /> */}
    </>
  );
};
