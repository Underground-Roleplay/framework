import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }
  #root{
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
  }
`;