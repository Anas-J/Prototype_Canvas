import React from 'react';
import './index.scss';

// Textual Card Header
const CardViewHeader = (props) => {
  const { header } = props;
  return <div className="cardsTextViewHeader">{header}</div>;
};
export default CardViewHeader;
