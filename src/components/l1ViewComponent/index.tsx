import React from 'react';
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as L1ViewRepresentation from './presentationView';
import './index.scss';

const L1ViewCardComponent = (props) => {
  const { data, parentClick, l1View } = props;
  const Representation = L1ViewRepresentation[data?.L1View];

  /**
   * function to handle click event from the parent
   */
  const handleClick = () => {
    if (!l1View) {
      parentClick(data.id);
    }
  };

  return (
    <div className="tileContainer" onClick={() => handleClick()} role="none">
      <Representation
        data={data?.dataFormat}
        tagDescription={data?.tagDescription}
        footer={data?.L1Footer}
        tagName={data?.tagName}
        text={data?.L1Text}
      />
      <div className="animatedBorder">
        <div className="animatedContent" />
      </div>
    </div>
  );
};
export default L1ViewCardComponent;
