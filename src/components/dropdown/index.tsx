import React, { useState } from 'react';
import filterIcon from '../../assets/images/dropdown-icon.svg';
import tick from '../../assets/images/tick.svg';
import './index.scss';

const Dropdown = (props) => {
  const { content, operation, selected, getSelected, invokedFunction } = props;
  const [closeDrop, setCloseDrop] = useState(false);

  /**
   * function to toggle filter dropdown
   */
  const toggleDropdown = () => {
    setCloseDrop(!closeDrop);
  };

  const handleSelect = (data) => {
    setCloseDrop(false);
    getSelected(data);
    invokedFunction();
  };

  /**
   * function to render all elements of sort dropdown
   */
  const renderDrop = (data) => {
    return (
      <li
        className={`content ${selected === data ? 'activeData' : ''}`}
        onClick={() => handleSelect(data)}
        role="none"
        key={data}
      >
        <img alt="src" src={tick} className={`tickImg  ${selected === data ? 'visible' : ''}`} />
        {data}
      </li>
    );
  };
  return (
    <article className="dropdown">
      <button type="button" onClick={toggleDropdown} className="toggleButton">
        <span>{operation}</span>
        <span>:</span>
        <span className="boldText">{selected}</span>
        <img alt="src" src={filterIcon} className={`filterIcon ' ${closeDrop ? 'invertIcon' : ''}`} />
      </button>
      <ul className={`filterDropdown ${!closeDrop ? ' closeDrop' : ''}`}>{content.map(renderDrop)}</ul>
    </article>
  );
};

export default Dropdown;
