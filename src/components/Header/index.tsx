import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 className="h2" style={{ color: '#474444' }}>
      {title}
    </h1>
  </div>
);
