import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const ProgressContainer = styled.div`
    z-index: 5;
    color: #000;
    width: 15%;
    position: fixed;
    bottom: 12.65%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
`;

export const ProgressLabel = styled.div`
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    position: absolute;
    display: inline-block;
    white-space: nowrap;
`;

export const Label = styled.div`
    font-size: 1.3vh;
    line-height: 4vh;
    position: relative;
    color: #ffffff;
    z-index: 10;
    font-weight: bold;
`;

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 4vh;
    background: rgba(0, 0, 0, 0.246);
    text-align: left;
    overflow: hidden;
    position: relative;
    display: block;
    white-space: nowrap;
    border-radius: 2px;
`;

export const ProgressBarFill = styled.div`
    background-color: #ffc130 !important;
    width: 0%;
    height: 4vh;
    transition: width 0.3s;
    transition-timing-function: ease-out;
`;
