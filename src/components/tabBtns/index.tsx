import React, { useState, useEffect } from 'react';
import './index.scss';

import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { setPlayStateAction } from '../../redux/actions/togglePlayAction';
import { setActiveStateAction } from '../../redux/actions/toggleActive';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Report');

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  /**
   * set the active tab by getting the current url
   */
  useEffect(() => {
    if (location.pathname === '/widgets') {
      setActiveTab('Widgets');
    } else {
      setActiveTab('Report');
    }
  }, []);

  /**
   * function to switch between report and widgets tab
   * @param tab
   */
  const tabToggler = (tab) => {
    setActiveTab(tab);
    const url = tab === 'Report' ? '/report' : '/widgets';
    if (tab === 'Widgets') {
      dispatch(setPlayStateAction(false));
      dispatch(setActiveStateAction(false));
      setTimeout(() => {
        history.push(url);
      }, 300);
    } else {
      history.push(url);
    }
  };

  return (
    <section className="tabContainer">
      <div className="tabParent">
        <div className={`selectedWrapper ${activeTab === 'Widgets' ? 'widgetSelection' : ''}`} />
        <button
          type="button"
          className={`tabNames ${activeTab === 'Report' ? 'activeTab' : ''}`}
          onClick={() => tabToggler('Report')}
        >
          Report
        </button>
        <button
          type="button"
          className={`tabNames ${activeTab === 'Widgets' ? 'activeTab' : ''}`}
          onClick={() => tabToggler('Widgets')}
        >
          Widgets
        </button>
      </div>
    </section>
  );
};

export default Tabs;
