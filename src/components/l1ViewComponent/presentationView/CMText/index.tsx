import React from 'react';
import PresentationHeader from '../../presentationHeader';
import PresentationTagDescription from '../../presentationTagDescription';
import textImageIcon from '../../../../assets/images/textImageIcon.svg';
import './index.scss';

// Text Graph Reprsentation
const CMText = (props) => {
  const { footer, tagName, text } = props;
  return (
    <>
      <PresentationHeader header={tagName} />
      {/* <div className="L1Wrapper">
        <img src={textImageIcon} alt="cm-text-icon" />
      </div> */}
      <PresentationTagDescription description={footer} text={text} />
    </>
  );
};
export default CMText;
