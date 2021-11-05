// related grid layout data structure
const relatedGridGraphData = [
  {
    name: 'There were 2 significant Incidents',
    id: 2,
    dataReportView: 'CMMultipleColumns',
    dataCardView: 'CMMultipleColumns',
    L1ViewImage: 'CMColumnChart',
    dataFormat: {
      title: 'Data Blueprint',
      subtitle: '01/24/2018',
      summary: {
      },
      data: [
        {
          label: '1995',
          series1: 8,
          series2: 14,
        },
        {
          label: '2000',
          series1: 26,
          series2: 5,
        },
        {
          label: '2005',
          series1: 20,
          series2: 14,
        },
        {
          label: '2010',
          series1: 21,
          series2: 15,
        },
        {
          label: '2016',
          series1: 45,
          series2: 10,
        },
      ],
      labels: [
        {
          value: 'series1',
          label: 'North America',
        },
        {
          value: 'series2',
          label: 'Europe',
        },
      ],
      info: [],
    },
    footerData: 'There are still deployments happening outside of window however it is trending down',
  },
  {
    name: 'Unplanned outages',
    id: 7,
    L1ViewImage: 'CMCircularTag',
    dataReportView: 'CMMultipleColumns',
    dataCardView: 'CMDonut',
    graphColors: ['#F4516C', '#F4516C', '#7169CB', '#F4516C', '#00C4DC', '#FCAF41'],
    dataFormat: {
      data: [
        {
          label: 'Label 1', value: '28',
        },
        {
          label: 'Label 2', value: '42',
        },
        {
          label: 'Label 3', value: '38',
        },
        {
          label: 'Label 4', value: '72',
        },
        {
          label: 'Label 5', value: '68',
        },
        {
          label: 'Label 6', value: '90',
        },
      ],
      summary: {
        value: 338, target: 50,
      },
      info: [],
    },
    footerData: 'There are still deployments happening outside of window however it is trending down',
  },
  {
    name: 'Which impacted PLAB02, PLAB07',
    id: 3,
    dataReportView: 'CMDonut',
    dataCardView: 'CMBar',
    L1ViewImage: 'CMDonutChart',
    dataFormat: {
      data: [
        {
          label: 'Label 1', value: '28',
        },
        {
          label: 'Label 2', value: '42',
        },
        {
          label: 'Label 3', value: '38',
        },
        {
          label: 'Label 4', value: '72',
        },
        {
          label: 'Label 5', value: '68',
        },
        {
          label: 'Label 6', value: '90',
        },
      ],
      summary: {
        value: 338, target: 50,
      },
      info: [],
    },
    footerData: 'There are still deployments happening outside of window however it is trending down',
  },
];

export default relatedGridGraphData;
