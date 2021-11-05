import React, { useEffect } from 'react';
import * as Graphs from '../../graphs';

// Graphs View
const GraphicalView = (props) => {
  const { graphName, data, graphRef, preferences } = props;
  const Graph = Graphs?.[graphName];

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // browser resize handler
  const onResize = () => {
    if (graphRef?.current) graphRef?.current.redraw();
  };

  return <Graph data={data} graphRef={graphRef} className="custom-class" preferences={preferences} />;
};

export default GraphicalView;
