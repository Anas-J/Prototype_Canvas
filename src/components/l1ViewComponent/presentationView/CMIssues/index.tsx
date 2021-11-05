import React from 'react';
import PresentationHeader from '../../presentationHeader';
import PresentationTagDescription from '../../presentationTagDescription';
import summationIssuesDataFormatted from '../../../../utils/summationIssuesDataFormatted';
import './index.scss';

// Issue Graph Representation
const CMIssues = (props) => {
  const { footer, tagName, data } = props;
  // const dataFormatted = summationIssuesDataFormatted(data);
  const dataFormatted = [
    {
      label: 'p0',
      value: 0,
    },
    {
      label: 'p1',
      value: 1,
    },
    {
      label: 'p2',
      value: 32,
    },
    {
      label: 'p3',
      value: 38,
    },
  ];
  return (
    <>
      <PresentationHeader header={tagName} />
      {/* <div className="L1Wrapper issues">
        {dataFormatted.map((item) => {
          return (
            <div className="circularContainer" key={item.value}>
              <div className="circularLabel">{item.label}</div>
              <div className="circularValue">{item.value}</div>
            </div>
          );
        })}
      </div> */}
      <PresentationTagDescription description={footer} text="" />
    </>
  );
};
export default CMIssues;
