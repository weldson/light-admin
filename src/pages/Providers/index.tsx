import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';

import { Header } from 'components/Header';
import { PaymentsContext } from 'services/payments/payments.context';
import { Provider } from 'interfaces/Provider';
import { ProvidersContext } from 'services/providers/providers.context';

import { AddModal } from './components/AddModal';
// import { EditModal } from './components/EditModal';

export const Providers = () => {
  const [provider, setProvider] = useState<Provider>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { providers, removeProvider } = useContext(ProvidersContext);

  const handleEdit = async (selectedProvider: Provider) => {
    setProvider(selectedProvider);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedProvider: Provider) => {
    if (selectedProvider.id) {
      await removeProvider(selectedProvider.id);
    }
  };

  return (
    <>
      <Header title="Fornecedores" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th>Nome</th>
                <th>Porte</th>
                <th>Instagram</th>
                <th>WhatsApp</th>
                <th>Site</th>
                <th>Cidade/Estado</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id} className="align-middle">
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.companySizeId}</td>
                  <td>{p.instagram}</td>
                  <td>{p.whatsapp}</td>
                  <td>{p.website}</td>
                  <td>{p.cityId}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(p)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(p)}>
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
        payment={payment}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      /> */}
    </>
  );
};
