import React from 'react';
import './index.scss';

const GraphicalHeader = (props) => {
  const { headerTitle, themeState } = props;
  return (
    <div
      className={`graphicalTitleHeading ${themeState === 'light' ? 'lighterThemeColor' : 'darkerThemeColor'}`}
      title={headerTitle}
    >
      {headerTitle}
    </div>
  );
};
export default GraphicalHeader;
