import React, { createRef, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import debounce from 'lodash.debounce';
import L1ViewCardComponent from '../l1ViewComponent';
import rightArrowCarousel from '../../assets/images/rightArrowCarousel.svg';
import rightArrowCarouselHovered from '../../assets/images/rightArrowCarouselHover.svg';
import leftArrowCarousel from '../../assets/images/leftArrowCarousel.svg';
import leftArrowCarouselHovered from '../../assets/images/leftArrowCarouselHover.svg';
import './index.scss';
import { setReportIdStateAction } from '../../redux/actions/updatedReportIdAction';
import { setPlayStateAction } from '../../redux/actions/togglePlayAction';
import { setActiveStateAction } from '../../redux/actions/toggleActive';

function SampleNextArrow(props) {
  const { dispatch, reportId, className, style, onClick, data, hovered, setHovered } = props;

  const updateSlide = debounce((click) => {
    click();
    data.map((item) => {
      const lastActive =
        parseInt(reportId.reportIdValState, 10) === data.length ? 1 : parseInt(reportId.reportIdValState, 10) + 1;
      if (item.id === lastActive) {
        const dataStat = {
          reportIdValState: item.id,
          currentReportIdName: item.parentName,
          currentReportParentId: item.parentId,
        };
        dispatch(setReportIdStateAction(dataStat));
      }
      return null;
    });
    return null;
  }, 300);

  return (
    <>
      {/* Carousel arrow */}
      <div
        role="presentation"
        className="carousel-arrow-state"
        style={hovered ? { ...style, display: 'block' } : { display: 'none' }}
        onClick={() => updateSlide(onClick)}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onKeyDown={onClick}
      >
        <img className={`${className} rightArrow`} src={rightArrowCarousel} alt="right-arrow" />
        <img className={`${className} rightArrowHover`} src={rightArrowCarouselHovered} alt="right-arrow" />
      </div>
    </>
  );
}

function SamplePrevArrow(props) {
  const { dispatch, reportId, className, style, onClick, data, hovered, setHovered } = props;

  const updatePreviousState = debounce((click) => {
    click();
    data.map((item) => {
      const lastActive =
        parseInt(reportId.reportIdValState, 10) === 1 ? data.length : parseInt(reportId.reportIdValState, 10) - 1;

      if (item.id === lastActive) {
        const dataStat = {
          reportIdValState: item.id,
          currentReportIdName: item.parentName,
          currentReportParentId: item.parentId,
        };
        dispatch(setReportIdStateAction(dataStat));
      }
      return null;
    });
  }, 300);

  return (
    <>
      {/* Carousel arrow */}
      <div
        role="presentation"
        className="carousel-arrow-state"
        style={hovered ? { ...style, display: 'block' } : { display: 'none' }}
        onClick={() => {
          updatePreviousState(onClick);
        }}
        onKeyDown={onClick}
      >
        <img
          className={`${className} leftArrow`}
          onMouseEnter={() => {
            setHovered(true);
          }}
          src={leftArrowCarousel}
          alt="left-arrow"
        />
        <img
          className={`${className} leftArrowHover`}
          onMouseEnter={() => {
            setHovered(true);
          }}
          src={leftArrowCarouselHovered}
          alt="left-arrow"
        />
      </div>
    </>
  );
}

const SliderComponent = (props) => {
  const { data } = props;
  const sliderRef = useRef<any>();
  const dispatch = useDispatch();
  const initialState = useSelector((state) => state);
  const [hovered, setHovered] = useState(false);
  const [hoveredID, setHoveredID] = useState();
  const [carouselHover, setCarouselHover] = useState(false);
  const [contentsMoved, setDefaultContent] = useState(false);
  const [prevSlide, setPrevSlide] = useState(1);
  const reportId = initialState?.reportId_state?.reportStatus;
  const playState = initialState?.play_state?.playStatus;
  const timerRef = useRef<any>();
  const playInterval = useRef<any>();
  let counter = reportId.reportIdValState;

  useEffect(() => {
    if (!hovered) {
      updateReport();
    }
  }, [reportId]);

  useEffect(() => {
    if (playState) {
      playInterval.current = setInterval(() => {
        playReportCard();
      }, 7000);
    } else {
      clearInterval(playInterval.current);
    }
  }, [playState]);

  /**
   * function to continue to play the carousel report card
   */
  const playReportCard = () => {
    if (counter === 10) {
      dispatch(setPlayStateAction(false));
      dispatch(setActiveStateAction(false));
      counter = counter + 1;
    } else {
      counter = counter + 1;
    }
    const lastActive = counter;
    const incomingSlide = data.filter((item) => {
      return item.id === lastActive;
    });
    if (counter !== 11) {
      setHovered(false);
      updateReportContent(incomingSlide[0]);
    }
  };

  const updateReport = () => {
    const slide = sliderRef.current;
    if (slide) {
      setHoveredID(reportId.reportIdValState);
      if (getPrevSlideDecision(reportId.reportIdValState)) {
        slide.slickPrev();
      } else if (getNextSlideDecision(reportId.reportIdValState)) {
        slide.slickNext();
      } else {
        slide.slickGoTo(reportId.reportIdValState);
      }
      setPrevSlide(reportId.reportIdValState);
    }
  };

  /**
   * function to return true/false depending on what the current and previous slides are
   * @param incomingSlideId
   */
  const getPrevSlideDecision = (incomingSlideId) => {
    if (incomingSlideId === 10) {
      if (prevSlide && prevSlide === 1) {
        return true;
      }
    } else if (incomingSlideId === 9) {
      if (prevSlide && prevSlide === 10) {
        return true;
      }
    }
    return false;
  };

  /**
   * function to return true/false depending on what the current and previous slides are
   * @param incomingSlideId
   */
  const getNextSlideDecision = (incomingSlideId) => {
    if (incomingSlideId === 1) {
      if (prevSlide && prevSlide === 10) {
        return true;
      }
    }
    return false;
  };

  const mouseEnter = (slide) => {
    if (playState) {
      dispatch(setPlayStateAction(false));
      dispatch(setActiveStateAction(false));
    }

    timerRef.current = setTimeout(() => {
      updateReportContent(slide);
      setDefaultContent(true);
    }, 3000);
    setHoveredID(slide.id);
    setHovered(true);
    setCarouselHover(true);
  };

  const mouseLeave = () => {
    /**
     * if hovered data is present, take that as priority
     * after that make it null, so that click event works
     */
    setHoveredID(reportId.reportIdValState);
    setHovered(false);
    setCarouselHover(false);

    if (contentsMoved) {
      setDefaultContent(false);
      updateReport();
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleClickEvent = (slide) => {
    setHovered(false);
    updateReportContent(slide);
  };

  const updateReportContent = (item) => {
    const dataStat = {
      reportIdValState: item.id,
      currentReportIdName: item.parentName,
      currentReportParentId: item.parentId,
    };
    dispatch(setReportIdStateAction(dataStat));
  };

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    centerPadding: -205,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // afterChange: (index) => {
    //   if (index === 0) {
    //     index = 10;
    //   }
    //   const filterItem = data.filter((item) => {
    //     return item.id === index;
    //   });
    //   updatePlayReport(filterItem[0]);
    // },
    nextArrow: (
      <SampleNextArrow
        dispatch={dispatch}
        reportId={reportId}
        data={data}
        hovered={carouselHover}
        setHovered={setCarouselHover}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        dispatch={dispatch}
        reportId={reportId}
        data={data}
        hovered={carouselHover}
        setHovered={setCarouselHover}
      />
    ),
  };

  return (
    <div className="sliderOuterWrap">
      <div className="sliderWrapper">
        <Slider ref={sliderRef} {...settings}>
          {data.map((slide) => {
            return (
              <div key={slide.id}>
                {/* {reportId.reportIdValState === slide.id && (
                  <div className="label-wrapper description">{slide.tagDescription}</div>
                )} */}
                <div
                  className={`carouselContainer ${
                    reportId.reportIdValState === slide.id && hoveredID === slide.id ? 'activeCard' : 'inactiveCard'
                  } ${hoveredID === slide.id ? ' hoveredActive' : ''}`}
                  role="none"
                  onClick={() => {
                    handleClickEvent(slide);
                  }}
                  onMouseEnter={(e) => {
                    mouseEnter(slide);
                  }}
                  onMouseLeave={(e) => {
                    mouseLeave();
                  }}
                >
                  <L1ViewCardComponent data={slide} l1View />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default SliderComponent;
