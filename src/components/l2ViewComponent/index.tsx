import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import graphData from '../../data/graphData';
import legendsData from '../../data/legendsData';
import Table from '../table';
import CardViewRepresentation from '../cardViewRepresentation';
import GraphicalHeader from '../graphicalRepresentation/graphicalHeader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';
import graphView from '../../assets/images/graphView.svg';
import tabView from '../../assets/images/tabView.svg';
import graphViewDark from '../../assets/images/graphViewDark.svg';
import tabViewDark from '../../assets/images/tabViewDark.svg';
import GraphicalRepresentation from '../graphicalRepresentation';
import createCollection from '../../utils/createReportCollection';

const L2ViewComponent = (props) => {
  const { data, graphRef } = props;
  const initialState = useSelector((state) => state);
  const reportId = initialState?.reportId_state?.reportStatus;
  const [currentData, setCurrentData] = useState([] as any);
  const themeState = initialState?.theme_state?.themeState;
  const [currentGraphData, setCurrentGraphData] = useState([] as any);
  const dataStructure = createCollection(graphData[0]);
  const [activeTab, setActiveTab] = useState('GraphView');
  const toggleState = initialState?.toggle_state?.toggleState;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    updateReport();
    updateGraphReport();
  }, [reportId]);

  useEffect(() => {
    onResize();
  }, [toggleState]);

  /**
   * rerender the graph on resize
   */
  const onResize = () => {
    setHide(true);
    setTimeout(() => {
      setHide(false);
    }, 500);
  };

  /**
   * function to get current tab data
   */
  const updateReport = () => {
    let filterData = [] as any;
    filterData = data.filter((item) => {
      return item.id === reportId.reportIdValState;
    });

    setCurrentData(filterData);
  };

  /**
   * function to get current graph data
   */
  const updateGraphReport = () => {
    let filterData = [] as any;
    filterData = dataStructure.filter((item) => {
      return item.id === reportId.reportIdValState;
    });

    setCurrentGraphData(filterData);
  };

  if (currentData.length && currentData[0].L2View === '') {
    return (
      <>
        {(reportId.reportIdValState === 3 || reportId.reportIdValState === 4) && (
          <div className="cardWrapperL2">
            <div className={`headerText ${themeState !== 'light' ? 'darkHead' : 'lightHead'}`}>
              <GraphicalHeader headerTitle={currentData[0]?.L2Name} themeState={themeState} />
              <div className="headerDesc" title={currentData[0]?.tagDescription}>
                {currentData[0]?.tagDescription}
              </div>
            </div>
            {/* <div className="tabWrapper" /> */}
            <div className="cardBody">
              <CardViewRepresentation data={currentData[0]} />
            </div>
          </div>
        )}
        {reportId.reportIdValState === 10 && (
          <div className="tableWrapperL2">
            <div className={`headerText ${themeState !== 'light' ? 'darkHead' : 'lightHead'}`}>
              <GraphicalHeader headerTitle={currentData[0]?.L2Name} themeState={themeState} />
              <div className="headerDesc" title={currentData[0]?.tagDescription}>
                {currentData[0]?.tagDescription}
              </div>
            </div>
            {/* <div className="tabWrapper" /> */}
            <div className={`tableBodyL2  ${themeState !== 'light' ? 'darkTableWrap' : 'lightTableWrap'}`}>
              <Table computeTotal={reportId.reportIdValState === 1 ? 1 : 0} data={currentData[0].dataFormat.data} />
            </div>
          </div>
        )}
      </>
    );
  }

  /**
   * function to render legends
   * @param reportName
   */
  const renderLegends = (reportName) => {
    const legendsValue = legendsData[reportName];
    return legendsValue.map((item) => {
      return (
        <section className="legendMarker" key={item.value}>
          <div
            className={`legendColor ${reportName === 'RFC Trend' ? 'areaLegends' : ''}`}
            style={{ backgroundColor: item.color }}
          />
          <div className="legendValue">{item.value}</div>
        </section>
      );
    });
  };

  return (
    <div className={`graphTableWrapper ${themeState !== 'light' ? 'darkGraphTableWrapper' : 'lightGraphTableWrapper'}`}>
      <div className="graphTableHeader">
        <div className="headerText">
          <GraphicalHeader headerTitle={currentGraphData[0]?.L2Name} themeState={themeState} />
          <div className="headerDesc" title={currentData[0]?.tagDescription}>
            {currentData[0]?.tagDescription}
          </div>
        </div>
        <div className="graphTableToggle">
          <div>
            <img
              className={` tabs graphTab ${activeTab === 'GraphView' ? 'activeTab' : ''} marginRight`}
              alt=""
              src={themeState !== 'light' ? graphViewDark : graphView}
              onClick={() => {
                setActiveTab('GraphView');
              }}
            />
          </div>
          <div>
            <img
              className={` tabs ${activeTab === 'TabView' ? 'activeTab' : ''}`}
              alt=""
              src={themeState !== 'light' ? tabViewDark : tabView}
              onClick={() => {
                setActiveTab('TabView');
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className="tabWrapper" /> */}
      {activeTab === 'GraphView' && (
        <div className={`graphWrapperL2 ${currentGraphData[0]?.DataType === 'MultiSeries' ? 'adjustHeight' : ''}`}>
          {!hide && (
            <GraphicalRepresentation dataState={currentGraphData[0]} themeState={themeState} graphRef={graphRef} />
          )}
        </div>
      )}
      {activeTab === 'GraphView' && currentGraphData[0]?.DataType === 'MultiSeries' && (
        <div className="graphicalLegends">{renderLegends(currentGraphData[0]?.tagName)}</div>
      )}
      {activeTab === 'TabView' && (
        <div className="tableForGraphL2">
          <Table computeTotal={reportId.reportIdValState === 2 ? 1 : 0} data={currentData[0].dataFormat.data} />
        </div>
      )}
    </div>
  );
};
export default L2ViewComponent;
