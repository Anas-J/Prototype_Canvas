import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../themes/globalStyles';
import { lightTheme, darkTheme } from '../../themes/themes';
import './index.scss';

import circleIcon from '../../assets/images/circle-white.svg';
import darkCircleIcon from '../../assets/images/dark-circle.svg';
import triangle from '../../assets/images/toggleArrowNav.svg';
import selectedCircle from '../../assets/images/circle.svg';
import { setReportIdStateAction } from '../../redux/actions/updatedReportIdAction';
import { setPlayStateAction } from '../../redux/actions/togglePlayAction';
import { setActiveStateAction } from '../../redux/actions/toggleActive';

/**
 * debounce function
 * @param callback
 * @param delay
 */
function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay]
  );
  return debouncedFn;
}

const Navbar = ({ data }) => {
  const dispatch = useDispatch();
  const initialState = useSelector((state) => state);
  const themeState = initialState?.theme_state?.themeState;
  const toggleState = initialState?.toggle_state?.toggleState;
  const reportId = initialState?.reportId_state?.reportStatus;
  const playStateValue = initialState?.active_state?.activeStatus;

  const [playState, setPlayState] = useState(false);
  const [visited, setVisited] = useState(data.reports[0].name);
  const [activeReport, setActiveReport] = useState(data.reports[0].name);

  useEffect(() => {
    const activeReportName = reportId.currentReportIdName;
    const activeReportParentId = reportId.currentReportParentId;
    setActiveReport(activeReportName || data.reports[0].name);
    if (playState) {
      setVisited([...visited, activeReportName || data.reports[0].name]);
    } else {
      setVisited([]);
    }
    const parentIndex = data.reports.findIndex((item) => {
      return item.name === activeReportName;
    });
    if (activeReportParentId) {
      setNavData(activeReportParentId);
    } else {
      setNavData(parentIndex + 1);
    }
  }, [reportId]);

  useEffect(() => {
    setVisited([]);
    if (playStateValue) {
      setVisited([activeReport]);
    }
    setPlayState(playStateValue);
  }, [playStateValue]);

  /**
   * function to set the active report name
   * @param name
   */
  const handleNavClick = useDebounce((report) => {
    setVisited([]);
    if (!playState) {
      dispatch(setPlayStateAction(false));
      dispatch(setActiveStateAction(false));
    }
    setActiveReport(report.name);
    setNavData(report.id);
    const dataStat = {
      reportIdValState: report.id,
      currentReportIdName: report.name,
      currentReportParentId: report.parentId,
    };
    dispatch(setReportIdStateAction(dataStat));
  }, 300);

  const setNavData = (id) => {
    const element = document.getElementsByClassName('activeTopLayer')[0] as HTMLElement;
    const topValue = (parseInt(id, 10) - 1) * 3.75;
    element.style.top = `${topValue}rem`;
    element.classList.remove(
      'lightGradient-1',
      'lightGradient-2',
      'lightGradient-3',
      'lightGradient-4',
      'lightGradient-5',
      'lightGradient-6',
      'lightGradient-7'
    );
    element.classList.add(`lightGradient-${id}`);
  };

  /**
   * function to render all the report high level contents
   * @param data
   */
  const renderContents = (content) => {
    return (
      <li
        role="none"
        className={`reportWrapper ${activeReport === content.name ? 'active' : ''}`}
        onClick={() => handleNavClick(content)}
        key={content.id}
      >
        {activeReport === content.name && (
          <img
            alt="src"
            src={themeState !== 'light' ? circleIcon : selectedCircle}
            className={`nodeCircle ${playState ? 'enlarge' : ''}`}
          />
        )}
        {activeReport !== content.name && (
          <img alt="src" src={themeState !== 'light' ? darkCircleIcon : circleIcon} className="nodeCircle" />
        )}
        {visited.indexOf(content.name) > -1 && (
          <img alt="src" src={themeState !== 'light' ? circleIcon : selectedCircle} className="nodeCircle" />
        )}
        <div
          className={`nodeLine ${activeReport === content.name || visited.indexOf(content.name) > -1 ? 'active' : ''}`}
        />
        <span className={`reportData ${activeReport === content.name ? 'active' : ''}`}>{content.name}</span>
      </li>
    );
  };

  /**
   * function to handle play/pause event
   */
  const handleClickEvent = () => {
    dispatch(setPlayStateAction(!playState));
    dispatch(setActiveStateAction(true));
    setPlayState(!playState);
  };

  return (
    <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <section
        className={`navContainer ${themeState === 'light' ? 'nav-light-theme' : 'nav-dark-theme'}  ${
          !toggleState ? 'showNavContainer' : 'hideNavContainer'
        }`}
      >
        <div className="navContentsWrapper">
          <div className="navTimeline" />

          <ul className="reportContent">
            <li className="activeTopLayer" />
            {data.reports.map(renderContents)}
          </ul>

          <div className="contentBtn" onClick={handleClickEvent} role="none">
            <div className="btnHolder">
              {!playState && <img alt="src" src={triangle} className="playBtn" />}
              {playState && (
                <div className="pauseBtn">
                  <span />
                  <span />
                </div>
              )}
            </div>
          </div>
          {/* <div className="addReport">
            <div className="addContent">
              <div className="addData">
                <img alt="src" src={addIcon} className={`addIcon ${themeState === 'light' ? 'dark-addIcon' : ''}`} />
                <span>ADD</span>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Navbar;
