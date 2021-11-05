import React, { useRef } from 'react';
import GraphicalHeader from './graphicalHeader';
import GraphicalView from './graphicalView';
import defaultPreferences from './defaultPreferences';
import './index.scss';

// L2 View Representation Container
const GraphicalRepresentation = (props) => {
  const { dataState, preferences, themeState, graphRef } = props;
  const tooltipDetailed = (tooltipData) => {
    const { data } = tooltipData;
    const value = data?.value;
    const label = data?.sublabel ? data?.sublabel : data?.label;
    if (value && value.length && Array.isArray(value)) {
      return (
        <>
          <div className="detailed-multiseries-data">
            <div className="detailed-label-text">{label}</div>
            <div>
              {value.map((item) => {
                return (
                  <div className="detailed-multiseries-value">
                    <div className="margin-right-tooltip-container">{item.label}</div>
                    <div className="multiseries-value">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="detailed-overall-wrap">
          <div className="detailed-label-text margin-right-tooltip-container">{label}</div>
          <div className="detailed-value">{value}</div>
        </div>
      </>
    );
  };

  if (dataState && dataState.dataFormat) {
    const {
      showTooltip,
      dashedYAxis,
      graphColors,
      showLinearGradient,
      linearGradientColors,
      setLeftBarSpace,
      xAxisFontSize,
      yAxisFontSize,
      circleGroupRadius,
      showValues,
      yAxisDomainFactor,
      showvalueGroup,
      showLabelsInMultiples,
      showCircleOnLines,
      isStacked,
      showLabelGroup,
      labelFontSize,
      valueFontSize,
    } = defaultPreferences(
      preferences,
      dataState?.graphColors,
      dataState?.showLinearGradient,
      dataState?.linearGradientColors
    );

    return (
      <>
        {/* <section className="graphicalHeader">
          <GraphicalHeader headerTitle={data?.parentName} themeState={themeState} />
        </section> */}
        <section className="graphicalView">
          <GraphicalView
            graphName={dataState?.L2View}
            data={dataState?.dataFormat}
            graphRef={graphRef}
            preferences={{
              showTooltip,
              dashedYAxis,
              graphColors,
              showLinearGradient,
              linearGradientColors,
              setLeftBarSpace,
              xAxisFontSize,
              yAxisFontSize,
              circleGroupRadius,
              showCircleOnLines,
              showValues,
              yAxisDomainFactor,
              showvalueGroup,
              showLabelsInMultiples,
              isStacked,
              showLabelGroup,
              labelFontSize,
              valueFontSize,
              ToolTipVisualization: tooltipDetailed,
            }}
          />
        </section>
      </>
    );
  }
  return null;
};

export default GraphicalRepresentation;
