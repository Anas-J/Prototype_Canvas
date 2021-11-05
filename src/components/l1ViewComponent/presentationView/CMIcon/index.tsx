import React from 'react';
import PresentationHeader from '../../presentationHeader';
import PresentationTagDescription from '../../presentationTagDescription';
import icons from './imageViews';
import './index.scss';

// Icon Graph Reprsentation
const CMIcon = (props) => {
  const { tagName, footer, text } = props;
  return (
    <>
      <PresentationHeader header={tagName} />
      {/* <div className="L1Wrapper">
        <img src={icons[tagName]} alt="l1-icon" />
      </div> */}
      <PresentationTagDescription description={footer} text={text} />
    </>
  );
};
export default CMIcon;
