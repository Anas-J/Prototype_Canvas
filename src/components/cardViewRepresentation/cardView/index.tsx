import React, { useEffect, useState } from 'react';
import './index.scss';

// Textual Card View
const CardView = (props) => {
  const { data } = props;
  let dataReport: any;
  const [report, setReport] = useState(dataReport);

  useEffect(() => {
    formatData();
  }, [data]);

  const formatData = () => {
    const obj = {};
    data.map((item) => {
      const keys = ['1', '2', '3', '4', '5', '6', '7'];
      keys.map((key) => {
        if (item[`header${key}`]) {
          obj[item[`header${key}`]] = item[`value${key}`];
        }
        return obj;
      });
      return obj;
    });
    setReport(obj);
  };

  return (
    <div className="cardViewContainer">
      {report &&
        Object.keys(report).map((row) => {
          return (
            <div
              className={`row ${row === 'Start' ? 'inlineStart' : ''} ${row === 'End' ? 'inlineEnd' : ''}`}
              key={row}
            >
              <div className="rowHeader">{row}</div>
              <div className="rowValue">{report[row]}</div>
            </div>
          );
        })}
    </div>
  );
};

export default CardView;
