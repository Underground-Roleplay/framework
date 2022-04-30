import React from 'react';
import ReactDOM from 'react-dom';

import Progressbar from './components/progressbar/index';
import GlobalStyle from './styles/global';

ReactDOM.render(
    <React.StrictMode>
        <Progressbar />
        <GlobalStyle />
    </React.StrictMode>,
    document.getElementById('root')
);
