const defaultPreference = {
  showTooltip: true,
  dashedYAxis: true,
  graphColors: ['#8A88AC', '#F4516C', '#7169CB'],
  setLeftBarSpace: 20,
  xAxisFontSize: 10,
  yAxisFontSize: 10,
  circleGroupRadius: 3,
  showValues: true,
  showvalueGroup: true,
  yAxisDomainFactor: 1.2,
  showLabelsInMultiples: true,
  showLinearGradient: true,
  showCircleOnLines: true,
  isStacked: true,
  showLabelGroup: true,
  labelFontSize: 12,
  valueFontSize: 14,
};

const defaultPreferences = (preferences, graphColors, showLinearGradient, linearGradientColors) => {
  // if (showLinearGradient) return { ...defaultPreference, showLinearGradient, linearGradientColors };
  if (graphColors) return { ...defaultPreference, ...preferences, graphColors };
  if (preferences) return { ...defaultPreference, ...preferences };
  return defaultPreference;
};

export default defaultPreferences;
