import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';

import { Header } from 'components/Header';

import { CompanySize } from 'interfaces/CompanySize';
import { CompaniesSizeContext } from 'services/companies-size/companies-size.context';

import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';

export const CompaniesSize = () => {
  const [companySize, setCompanySize] = useState<CompanySize>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { companiesSize, removeCompanySize } = useContext(CompaniesSizeContext);

  const handleEdit = async (selectedCompanySize: CompanySize) => {
    setCompanySize(selectedCompanySize);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedCompanySize: CompanySize) => {
    if (selectedCompanySize.id) {
      await removeCompanySize(selectedCompanySize.id);
    }
  };

  return (
    <>
      <Header title="Porte dos Fornecedores" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-10 col-sm-9">Nome</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {companiesSize.map((cs) => (
                <tr key={cs.id} className="align-middle">
                  <td>{cs.id}</td>
                  <td>{cs.name}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(cs)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(cs)}>
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
        companySize={companySize}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      />
    </>
  );
};
