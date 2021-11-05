import React, { useState, useEffect } from 'react';
import './index.scss';

import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GlobalStyles from '../../themes/globalStyles';
import { lightTheme, darkTheme } from '../../themes/themes';
import profileImg from '../../assets/images/profile.svg';
import lightThemeImg from '../../assets/images/theme.svg';
import darkThemeImg from '../../assets/images/darkmode.svg';
import { setThemeStateAction } from '../../redux/actions/themeAction';
import { setPlayStateAction } from '../../redux/actions/togglePlayAction';
import { setActiveStateAction } from '../../redux/actions/toggleActive';
import Modal from '../modal/index';

import Tabs from '../tabBtns/index';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const initialState = useSelector((state) => state);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalClose, setModalClose] = useState(false);

  const theme = initialState?.theme_state?.themeState;

  const handleModal = () => {
    dispatch(setPlayStateAction(false));
    dispatch(setActiveStateAction(false));
    const checkbox = document.getElementById('iconCheckbox') as HTMLInputElement;
    if (!isModalOpen) {
      checkbox.checked = true;
      setTimeout(() => {
        setModalOpen(true);
        setModalClose(true);
      }, 300);
    } else {
      checkbox.checked = false;
      setModalClose(false);
      setTimeout(() => {
        setModalOpen(false);
      }, 500);
    }
  };

  /**
   * function to toggle dark and light theme
   */
  const themeToggler = () => {
    if (theme === 'light') {
      return dispatch(setThemeStateAction('dark'));
    }
    return dispatch(setThemeStateAction('light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Modal
        isModalClose={isModalClose}
        isModalOpen={isModalOpen}
        setModalClose={setModalClose}
        setModalOpen={setModalOpen}
      />
      <header className="headerWrap">
        <section className="reportModalControls" onClick={() => handleModal()} role="none">
          <div className="hamburgerIcon">
            <input className="iconCheckbox" id="iconCheckbox" type="checkbox" />
            <div>
              <span />
              <span />
            </div>
          </div>
          <div className="activeReport">Environment Operations - Weekly Report</div>
        </section>
        <section className="rightHeader">
          <button type="button" onClick={themeToggler} className="themeBtn">
            <img alt="src" src={theme === 'light' ? darkThemeImg : lightThemeImg} className="themeVector" />
          </button>
          <Tabs />
          <div className="profileWrap">
            <div className="profileHeader">
              <div className="salutation">
                <span>Hello, </span>
                <span className="boldText"> John</span>
              </div>
              <div className="reportUpdate">Updated: 17th June</div>
            </div>
            <img src={profileImg} alt="profile" className="profilePic" />
          </div>
        </section>
      </header>
    </ThemeProvider>
  );
};
export default Header;
