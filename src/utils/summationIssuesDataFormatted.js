const summationIssuesDataFormatted = (dataStructure) => {
  const tittle = [
    dataStructure.data[0].header2,
    dataStructure.data[0].header3,
    dataStructure.data[0].header4,
    dataStructure.data[0].header5,
  ];
  let colSum = new Array(tittle.length).fill(0);
  let formattedData = new Array(tittle.length).fill(0);
  dataStructure.data.map((colData) => {
    const values = [colData.value2, colData.value3, colData.value4, colData.value5];
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

    formattedData = colSum.map((item, i) => {
      return {
        label: tittle[i],
        value: item,
      };
    });

    return null;
  });
  return formattedData;
};

export default summationIssuesDataFormatted;
