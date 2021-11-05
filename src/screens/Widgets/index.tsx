import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import search from '../../assets/images/searchicon.svg';
import createCollection from '../../utils/createReportCollection';
import L1ViewCardComponent from '../../components/l1ViewComponent';
import './index.scss';

const Widgets = ({ data }) => {
  const history = useHistory();
  const initialState = useSelector((state: { themeState: typeof themeState }) => state);
  const themeState = initialState?.theme_state?.themeState;
  const dataStructure = createCollection(data);

  const [activeTag, setActiveTags] = useState([]);
  const [tileLists, setTileList] = useState(dataStructure);

  /**
   * function to select/deselect tags
   * @param tagsName
   */
  const toggleSelection = (tagsName) => {
    const activeTagList = JSON.parse(JSON.stringify(activeTag));
    setTileList([]);
    /**
     * if a tag is already present, then remove it
     */
    if (activeTagList.indexOf(tagsName) > -1) {
      const index = activeTagList.indexOf(tagsName);
      setTimeout(() => {
        activeTagList.splice(index, 1);
        setActiveTags(activeTagList);
        const filteredDetailReport = dataStructure.filter((item) => {
          return activeTagList.indexOf(item.parentName) > -1;
        });
        if (filteredDetailReport.length === 0) {
          setTileList(dataStructure);
        } else {
          setTileList(filteredDetailReport);
        }
      }, 600);
    } else {
      /**
       * if a tag is selected for the first time
       */
      setTimeout(() => {
        activeTagList.push(tagsName);
        setActiveTags(activeTagList);
        const filteredDetailReport = dataStructure.filter((item) => {
          return activeTagList.indexOf(item.parentName) > -1;
        });
        setTileList(filteredDetailReport);
      }, 600);
    }
  };

  /**
   * function to render all the tags
   * @param tags
   */
  const renderTags = (tags) => {
    const activeTagList = JSON.parse(JSON.stringify(activeTag));
    return (
      <div className="tagsContainer" key={tags.name}>
        <span
          className={`tagsData ${activeTagList.indexOf(tags.name) > -1 ? 'activeReport' : ''}`}
          onClick={() => toggleSelection(tags.name)}
          role="none"
        >
          {tags.name}
        </span>
      </div>
    );
  };

  /**
   * function to route to detail page
   * @param report
   */
  const renderDetailedView = (id) => {
    history.push(`/detail?data=${id}`);
  };

  /**
   * function to render all the widgets
   * @param widget
   */
  const renderWidgets = (widget) => {
    return (
      <CSSTransition timeout={600} classNames="page" key={widget.id}>
        <L1ViewCardComponent data={widget} parentClick={renderDetailedView} l1View={false} />
      </CSSTransition>
    );
  };

  return (
    <section className={`widgetContainer ${themeState !== 'light' ? 'dark' : 'light'}`}>
      <article className="widgetContent">
        {/* <div className="searchWidget">
          <img alt="src" src={search} className="searchIcon" />
          <input placeholder="Search" className="searchBox" />
        </div> */}
        <div className="tagsWrapper">{data.reports.map(renderTags)}</div>
        <article className="widgetsWrapper">
          <TransitionGroup component={null}>{tileLists.map(renderWidgets)}</TransitionGroup>
        </article>
      </article>
    </section>
  );
};

export default Widgets;
