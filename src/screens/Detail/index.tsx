import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import BackVector from '../../assets/images/back.svg';
import graphData from '../../data/graphData';
import createCollection from '../../utils/createReportCollection';
import Table from '../../components/table/index';
import CardViewRepresentation from '../../components/cardViewRepresentation/index';
import GraphicalRepresentation from '../../components/graphicalRepresentation';

import './index.scss';

const Detail = ({ data }) => {
  let dataReport: any;
  const dataStructure = createCollection(data);
  const history = useHistory();
  const location = useLocation();
  const [report, setReport] = useState(dataReport);
  const [currentGraphData, setCurrentGraphData] = useState([] as any);
  const initialState = useSelector((state: { themeState: typeof themeState }) => state);
  const themeState = initialState?.theme_state?.themeState;
  const graphRef = useRef();
  const graphDataStructure = createCollection(graphData[0]);

  /**
   * using the data id, filter the correct data
   */
  useEffect(() => {
    const reportContent: any[] = [];
    const id = location.search.split('=')[1];
    if (dataStructure) {
      dataStructure.map((item) => {
        if (item.id === parseInt(id, 10)) {
          reportContent.push(item);
        }
        return reportContent;
      });
    }
    setReport(reportContent[0]);
  }, [dataStructure]);

  useEffect(() => {
    updateGraphReport();
  }, []);

  /**
   * function to get graph data using id
   */
  const updateGraphReport = () => {
    const id = Number(location.search.split('=')[1]);
    let filterData = [] as any;
    filterData = graphDataStructure.filter((item) => {
      return item.id === id;
    });

    setCurrentGraphData(filterData);
  };

  if (report && report.L2View === '') {
    return (
      <section className={`detailContainer ${themeState !== 'light' ? 'dark' : 'light'}`}>
        <article className="detailContent">
          <img alt="src" src={BackVector} className="backLogo" onClick={() => history.goBack()} />
          {report && (
            <section className="detailReport">
              <header className="detailHeader">{report?.tagName}</header>
              {(report.id === 3 || report.id === 4) && (
                <div className="cardWrapperL2">
                  <div className="cardBody">
                    <CardViewRepresentation data={report} />
                  </div>
                </div>
              )}
              {report.id !== 3 && report.id !== 4 && (
                <div className="tableWrapperL2">
                  <div className="tableBodyL2">
                    <Table computeTotal={report.id === 1 ? 1 : 0} data={report.dataFormat.data} />
                  </div>
                </div>
              )}
            </section>
          )}
        </article>
      </section>
    );
  }

  return (
    <section className={`detailContainer ${themeState !== 'light' ? 'dark' : 'light'}`}>
      <article className="detailContent">
        <img alt="src" src={BackVector} className="backLogo" onClick={() => history.goBack()} />
        {report && (
          <section className="detailReport">
            <header className="detailHeader">{report?.tagName}</header>
            <div className="graphWrapperDetail">
              <GraphicalRepresentation dataState={currentGraphData[0]} themeState={themeState} graphRef={graphRef} />
            </div>
            <div className="tableForGraphDetail">
              <Table computeTotal={report.id === 2 ? 1 : 0} data={report.dataFormat.data} />
            </div>
          </section>
        )}
      </article>
    </section>
  );
};

export default Detail;
