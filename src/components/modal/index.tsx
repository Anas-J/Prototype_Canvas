import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cross from '../../assets/images/cross.svg';
import crossWhite from '../../assets/images/crossWhite.svg';
import dataStructures from '../../data/index';
import getSortedList from '../../utils/sort';
import Dropdown from '../dropdown/index';
import './index.scss';

const Modal = (props) => {
  const { isModalClose, isModalOpen, setModalOpen, setModalClose } = props;
  const initialState = useSelector((state) => state);
  const themeState = initialState?.theme_state?.themeState;
  const { report } = dataStructures;
  const [closeFilter, setCloseFilter] = useState(false);
  const [closeSort, setCloseSort] = useState(false);
  const [activeTag, setActiveTag] = useState('Weekly');
  const [criteria, setCriteria] = useState('Latest');
  const [reportList, setReportList] = useState(report);
  const [activeReport, setActiveReport] = useState(report[0].name);
  const filterReport = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  const sortReport = ['Alphabetical', 'Latest', 'Oldest'];

  /**
   * function to toggle filter dropdown
   */
  const toggleFilter = () => {
    setCloseFilter(!closeFilter);
    setCloseSort(false);
  };

  /**
   * function to toggle sort dropdown
   */
  const toggleSort = () => {
    setCloseSort(!closeSort);
    setCloseFilter(false);
  };

  /**
   * function to set the active report
   */
  const handleActiveReport = (reports) => {
    setActiveReport(reports);
    setTimeout(() => {
      setModalClose(false);
      setTimeout(() => {
        setModalOpen(false);
      }, 500);
    }, 500);
  };

  /**
   * function to close modal from cross icon
   */
  const closeModalCross = () => {
    setModalClose(false);
    setTimeout(() => {
      setModalOpen(false);
    }, 500);
  };

  /**
   * function to render all the cards of report list
   */
  const renderReports = (data) => {
    return (
      <CSSTransition timeout={600} classNames="page" key={data.name}>
        <div
          className={`reportWrapperLayout ${activeReport === data.name ? 'activeReportTile' : 'disabled'}`}
          onClick={() => handleActiveReport(data.name)}
          role="none"
        >
          <div className="reportDataName reportName">{data.name}</div>
          {data.date && <div className="reportDataName reportDate">{data.date}</div>}
        </div>
      </CSSTransition>
    );
  };

  /**
   * function filtering the cards based on filter dropdown selection
   */
  const filterReports = () => {
    toggleFilter();
    if (activeTag !== 'Yearly') {
      const reportCollection = report.filter((item) => {
        return item.tag === activeTag;
      });
      setReportList([]);
      setTimeout(() => {
        setReportList(reportCollection);
      }, 600);
    } else {
      setReportList(report);
    }
  };

  /**
   * function sorting the cards based on sort dropdown selection
   */
  const sortBy = () => {
    toggleSort();
    const sortedList = getSortedList(criteria, reportList);
    setReportList([]);
    setTimeout(() => {
      setReportList(sortedList);
    }, 500);
    return null;
  };

  return (
    <article
      className={`modal ${isModalOpen ? ' showModal ' : ' closeModal '} ${isModalClose ? ' zoomIn ' : ' zoomOut '}`}
    >
      <section
        className={`modalContent ${isModalOpen ? ' showModal ' : ' closeModal '} ${
          isModalClose ? ' slideIn ' : ' slideOut '
        } ${themeState === 'light' || themeState === false ? ' lightModalContent ' : ' darkModalContent '}`}
      >
        <div className="modalTopHeader">
          {/* <div className="modalTopHeaderWrap" onClick={() => closeModalCross()} role="none">
            <img
              src={themeState === 'light' || themeState === false ? cross : crossWhite}
              alt=""
              className="crossIcon"
            />
            <div className="header">Environment Operations - Weekly Report</div>
          </div> */}
        </div>
        <div className="modalBody">
          <div className="modalHeader">
            <div className="reportTitle">REPORTS</div>
            <div className="filterWrap">
              <div className="sortDropdown">
                <Dropdown
                  content={sortReport}
                  operation="Sort"
                  selected={criteria}
                  getSelected={setCriteria}
                  invokedFunction={() => sortBy()}
                />
              </div>
              <div className="filterDropdown">
                <Dropdown
                  content={filterReport}
                  operation="Filter"
                  selected={activeTag}
                  getSelected={setActiveTag}
                  invokedFunction={() => filterReports()}
                />
              </div>
            </div>
          </div>
          <div className="reportDataLayout">
            <TransitionGroup component={null}>{reportList && reportList.map(renderReports)}</TransitionGroup>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Modal;
