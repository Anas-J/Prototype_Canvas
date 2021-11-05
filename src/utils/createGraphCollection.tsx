const createGraphData = (rawData) => {
  const compiledData = JSON.parse(JSON.stringify(rawData));
  rawData.map((dataset, index) => {
    const content = [] as any;
    let keys = [] as any;
    keys = Object.keys(dataset?.dataFormat?.data[0]);
    keys.shift();
    const totalUniqueKeys = keys.length / 2;
    dataset?.dataFormat.data.map((item) => {
      const obj = {
        label: item.value1,
      };
      for (let i = 1; i < totalUniqueKeys; i = i + 1) {
        if (item[`header${i + 1}`]) {
          obj[item[`header${i + 1}`]] = item[`value${i + 1}`];
        }
      }
      content.push(obj);
      return null;
    });
    compiledData[index].dataFormat = {
      data: content,
    };
    return null;
  });
  return compiledData;
};

export default createGraphData;
