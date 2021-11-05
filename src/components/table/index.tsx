import React from 'react';
import './index.scss';

const Table = (props) => {
  const { computeTotal, data } = props;

  /**
   * get the coloumn tittle
   */
  const tittle = [
    data[0].header1,
    data[0].header2,
    data[0].header3,
    data[0].header4,
    data[0].header5,
    data[0].header6,
    data[0].header7,
  ];
  /**
   * get rid of null values from tittle
   */
  const filteredTittle = tittle.filter((el) => {
    return el != null;
  });

  /**
   *  array to compute the coloumn sum
   */
  let colSum = new Array(tittle.length).fill(0);

  /**
   *  add total column in the tittle
   */
  if (computeTotal === 1) {
    filteredTittle.push('Total');
  }

  /**
   *  function to render row data
   */
  const renderRow = (rowData) => {
    return <td>{rowData}</td>;
  };

  /**
   *  function to render column data when computeTotal is true
   */
  const renderTable = (colData) => {
    // get data values
    const values = [
      colData.value1,
      colData.value2,
      colData.value3,
      colData.value4,
      colData.value5,
      colData.value6,
      colData.value7,
    ];

    // get rid of null values
    const filteredValue = values.filter((el) => {
      return el != null;
    });

    // covert values array to number array to compute sum
    const tempArray = [...filteredValue];
    tempArray.shift();
    const numArray = tempArray.map((item) => {
      return parseInt(item, 10);
    });

    // compute row wise sum
    const rowSum = (arr) => {
      return arr.reduce((a, b) => {
        return a + b;
      }, 0);
    };
    const sum = rowSum(numArray);
    numArray.push(sum);

    // compute row wise sum
    colSum = numArray.map((num, idx) => {
      return num + colSum[idx];
    });
    filteredValue.push(sum);

    return <tr>{filteredValue.map(renderRow)}</tr>;
  };

  /**
   *  function to render column data when computeTotal is false
   */
  const renderTab = (data3) => {
    const valueList = [
      data3.value1,
      data3.value2,
      data3.value3,
      data3.value4,
      data3.value5,
      data3.value6,
      data3.value7,
    ];
    const filteredValue = valueList.filter((el) => {
      return el != null;
    });
    return <tr>{filteredValue.map(renderRow)}</tr>;
  };

  return (
    <article>
      {computeTotal === 1 ? (
        <table className="tableWithSum tableContent">
          <tbody>
            <tr>{filteredTittle.map(renderRow)}</tr>
            {data.map(renderTable)}
            <tr>
              <td>Total Unique Issues</td>
              {colSum.map(renderRow)}
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="tableWithoutSum tableContent">
          <tbody>
            <tr>{filteredTittle.map(renderRow)}</tr>
            {data.map(renderTab)}
          </tbody>
        </table>
      )}
    </article>
  );
};

export default Table;
