const calculateDirection = (direction, dataStructure, reportId) => {
  let dataStat = {};
  dataStructure.map((item) => {
    if (direction === 'right') {
      const lastActive =
        parseInt(reportId.reportIdValState, 10) === dataStructure.length
          ? 1
          : parseInt(reportId.reportIdValState, 10) + 1;
      if (item.id === lastActive) {
        dataStat = {
          reportIdValState: item.id,
          currentReportIdName: item.parentName,
          currentReportParentId: item.parentId,
        };
      }
    } else {
      const lastActive =
        parseInt(reportId.reportIdValState, 10) === 1
          ? dataStructure.length
          : parseInt(reportId.reportIdValState, 10) - 1;
      if (item.id === lastActive) {
        dataStat = {
          reportIdValState: item.id,
          currentReportIdName: item.parentName,
          currentReportParentId: item.parentId,
        };
      }
    }
    return null;
  });
  return dataStat;
};
export default calculateDirection;
