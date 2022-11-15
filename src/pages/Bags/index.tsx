import React, { useState, useContext } from 'react';

import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { CustomCard } from 'components/CustomCard';
import { CustomTable } from 'components/CustomTable';
import { Bag } from 'interfaces/Bag';
import { Subheader } from 'components/Subheader';
import { Header } from 'components/Header';

import { BagsContext } from 'services/bags/bags.context';

import { CircleButton } from './styles';
import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';

export const Bags = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [bag, setBag] = useState<Bag>();

  const { bags, removeBag } = useContext(BagsContext);

  const handleEdit = (selectedBag: Bag) => {
    setBag(selectedBag);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedBag: Bag) => {
    if (selectedBag.id) {
      await removeBag(selectedBag.id);
    }
  };

  return (
    <>
      <Header title="Embalagens" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-5 col-sm-5">Nome</th>
                <th className="col-md-3 col-sm-2">Quantidade</th>
                <th className="col-md-2 col-sm-2">Preço</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {bags.map((b) => (
                <tr key={b.id} className="align-middle">
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.quantity}</td>
                  <td>{b.price}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(b)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(b)}>
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

      <EditModal
        bag={bag}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      />
    </>
  );
};
