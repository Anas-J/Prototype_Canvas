const createCollection = (dataStructures) => {
  const reportContent = [];
  dataStructures.reports?.map((report) => {
    report?.cardsView.map((item) => {
      reportContent.push(item);
      return null;
    });
    return null;
  });
  return reportContent;
};

export default createCollection;
