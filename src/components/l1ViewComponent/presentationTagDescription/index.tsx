import React from 'react';
import './index.scss';

const PresentationTagDescription = (props) => {
  const { description, text } = props;
  return (
    <div className="tagDescWrap">
      <div className="tagDescription">
        {text !== '' && <div className="tagText">{text}</div>}
        {description && <div className="tagDesc">{description}</div>}
      </div>
    </div>
  );
};

export default PresentationTagDescription;
