import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToggleStateAction } from '../../redux/actions/toggleStateAction';
import triangle from '../../assets/images/toggleArrowNav.svg';
import './index.scss';
import Navbar from '../../components/navbar/index';
import L2ViewComponent from '../../components/l2ViewComponent';
import SliderComponent from '../../components/sliderComponent';
import createCollection from '../../utils/createReportCollection';
import { setReportIdStateAction } from '../../redux/actions/updatedReportIdAction';
import { setPlayStateAction } from '../../redux/actions/togglePlayAction';
import { setActiveStateAction } from '../../redux/actions/toggleActive';
import calculateDirection from '../../utils/calculateDirection';
import arrowLeft from '../../assets/images/arrowLeft.svg';
import arrowRight from '../../assets/images/arrowRight.svg';

const Report = ({ data }) => {
  const initialState = useSelector((state: { themeState: typeof themeState }) => state);
  const dispatch = useDispatch();
  const themeState = initialState?.theme_state?.themeState;
  const toggleState = initialState?.toggle_state?.toggleState;
  const reportId = initialState?.reportId_state?.reportStatus;
  const dataStructure = createCollection(data);
  const graphRef = useRef();

  const toggleNavContainer = () => {
    dispatch(setToggleStateAction(!toggleState));
  };

  const updateContents = (direction) => {
    dispatch(setPlayStateAction(false));
    dispatch(setActiveStateAction(false));
    const dataStat = calculateDirection(direction, dataStructure, reportId);
    dispatch(setReportIdStateAction(dataStat));
  };

  return (
    <section className={`reportContainer ${themeState === 'light' ? 'light' : 'dark'}`}>
      {/* Nav bar container */}
      <Navbar data={data} />
      {/* Toggle Button View */}
      <div className="toggleButtonContainer" role="none" onClick={toggleNavContainer}>
        <img
          className={`nav-img ${!toggleState ? 'nav-toggle-img' : 'rotate-nav-toggle-img'}`}
          src={triangle}
          alt="nav-toggle-img"
        />
      </div>

      {/* Report View Container */}
      <article
        className={`reportContents ${toggleState ? 'reportContentFullViewPage' : 'reportContentOnNavOpenViewPage'}`}
      >
        <section className="l2ViewComponent">
          <div className={`l2ViewSection ${toggleState ? 'widthFullView' : 'widthCollapseView'}`}>
            <div className="l2ViewArrow left-side" role="none" onClick={() => updateContents('left')}>
              <img className="arrowImg" src={arrowLeft} alt="left-arrow" />
            </div>
            <div className="representationViews">
              <L2ViewComponent data={dataStructure} graphRef={graphRef} />
            </div>
            <div className="l2ViewArrow right-side" role="none" onClick={() => updateContents('right')}>
              <img className="arrowImg" src={arrowRight} alt="right-arrow" />
            </div>
          </div>
        </section>
        <section className="sliderComponent">
          <SliderComponent data={dataStructure} />
        </section>
      </article>
    </section>
  );
};

export default Report;
