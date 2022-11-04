import { Card, Table } from 'react-bootstrap';
import styled from 'styled-components';

export const SubheaderContainer = styled.div`
  display: flex;

  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  /* background-color: beige; */
`;

export const ButtonContainer = styled.div`
  display: flex;

  align-items: flex-start;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  /* background-color: aliceblue; */
`;

export const CustomCard = styled(Card)`
  border-width: 0;
`;

export const CustomTable = styled(Table)`
  thead {
    tr {
      th {
        font-size: 15px;
        text-transform: uppercase;
        color: #5f5b5b;
      }
    }
  }
  tbody {
    tr {
      /* height: 50px; */
      /* margin-top: 2px; */
      border-top-width: 4px;
      background-color: #f8f9fa;
      border-top-color: #fff;
      td {
        font-size: 15px;
        color: 474444;
      }
    }
  }
`;

export const CircleButton = styled.button`
  background-color: #fff;
  border-width: 0;
  border-radius: 50%;
  margin-right: 8px;
  height: 32px;
  width: 32px;
`;
