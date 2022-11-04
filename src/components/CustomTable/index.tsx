import { Table } from 'react-bootstrap';
import styled from 'styled-components';

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
