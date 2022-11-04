import { Button, Card, Table } from 'react-bootstrap';
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

export const CircleButton = styled.button`
  background-color: #fff;
  border-width: 0;
  border-radius: 50%;
  margin-right: 8px;
  height: 32px;
  width: 32px;
`;
