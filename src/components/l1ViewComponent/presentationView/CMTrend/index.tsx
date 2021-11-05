import React from 'react';
import PresentationHeader from '../../presentationHeader';
import PresentationTagDescription from '../../presentationTagDescription';
import downArrowIcon from '../../../../assets/images/arrowDown.svg';
import './index.scss';

// Trend Graph Representation
const CMTrend = (props) => {
  const { footer, tagName, text } = props;
  return (
    <>
      <PresentationHeader header={tagName} />
      {/* <div className="L1Wrapper">
        <div className="textValueGradient" />
        <div className="textPosition">
          <img src={downArrowIcon} alt="downArrow" />
        </div>
      </div> */}
      <PresentationTagDescription description={footer} text={text} />
    </>
  );
};
export default CMTrend;
