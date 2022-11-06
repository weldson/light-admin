import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';
import { State } from 'interfaces/State';
import { StatesContext } from 'services/states/states.context';
import { Header } from '../../components/Header';

import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';

export const States = () => {
  const [state, setState] = useState<State>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { states, removeState } = useContext(StatesContext);

  const handleEdit = async (selectedState: State) => {
    setState(selectedState);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedState: State) => {
    if (selectedState.id) {
      await removeState(selectedState.id);
    }
  };

  return (
    <>
      <Header title="Estados" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-1 col-sm-1">Sigla</th>
                <th className="col-md-9 col-sm-8">Nome</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {states.map((s) => (
                <tr key={s.id} className="align-middle">
                  <td>{s.id}</td>
                  <td>{s.slug}</td>
                  <td>{s.name}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(s)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(s)}>
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
        state={state}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      />
    </>
  );
};
