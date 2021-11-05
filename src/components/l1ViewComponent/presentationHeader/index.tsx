import React from 'react';
import './index.scss';

const PresentationHeader = (props) => {
  const { header } = props;
  return <div className="headerL1View">{header}</div>;
};

export default PresentationHeader;
