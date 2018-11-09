import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Super from "./Components/Super/super";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#3e88ed",
        accent1Color: "#db3236",
        /*primary2Color: cyan700,
        primary3Color: grey400,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,*/
    },
    appBar: {
        height: 50,
    },
});

const Root =
<MuiThemeProvider muiTheme={muiTheme} >
    <Router>
        <div>
            <Super/>
        </div>
    </Router>
</MuiThemeProvider>;

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();



// WEBPACK FOOTER //
// ./src/index.js