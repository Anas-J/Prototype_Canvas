import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .headerWrap {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .headerWrap .reportModalControls .hamburgerIcon span {
    background: ${({ theme }) => theme.text};
  }
  .tabParent {
    background: ${({ theme }) => theme.btnBackground};
    transition: all 0.50s linear;
  }
  .tabNames {
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .navContainer {
    background-color: ${({ theme }) => theme.navBg};
    border-top: ${({ theme }) => theme.navBorder};
    transition: all 0.50s linear;
  }
  .navTimeline, .nodeLine {
    background-color: ${({ theme }) => theme.verticalLine};
    transition: all 0.50s linear;
  }
  .addReport {
    background-image: ${({ theme }) => theme.linearGrd};
    transition: all 0.50s linear;
  }
  .addReport span {
    color: ${({ theme }) => theme.addColor};
    transition: all 0.50s linear;
  }
  .reportContent {
    color: ${({ theme }) => theme.navColor};
    transition: color 0.50s linear;
  }
  .nodeLine.active {
    background-color: ${({ theme }) => theme.navTextColor};
    transition: all 0.50s linear;
  }
  .reportData.active  {
    color: ${({ theme }) => theme.navTextColor};
    transition: all 0.50s linear;
  }
  .activeTopLayer {
    background-image: ${({ theme }) => theme.topBg};
  }
  .relatedHeader {
    color: ${({ theme }) => theme.navTextColor};
    transition: all 0.50s linear;
  }
  .tileContainer {
    box-shadow: ${({ theme }) => theme.tileBoxShadow};
    transition: all 0.50s linear;
  }
  .detailHeader {
    color: ${({ theme }) => theme.navTextColor};
    transition: all 0.50s linear;
  }
  .label-wrapper.description {
    color: ${({ theme }) => theme.navTextColor};
    transition: all 0.50s linear;
  }
  .legendValue {
    color: ${({ theme }) => theme.navTextColor};
    transition: all 0.50s linear;
  }
  .contentBtn {
    background-image: ${({ theme }) => theme.btnBg};
    transition: all 0.50s linear;
  }
  `;

export default GlobalStyles;
