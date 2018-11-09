import React from 'react';
import App from './App';
import './index.css';

class AppIndex extends React.Component {

    componentWillMount() {
        window.location.href = "https://www.udghosh.org/nossq/index.html";
    }

    render() {

        return(
            <App/>
        );
    }
}

export default AppIndex;



// WEBPACK FOOTER //
// ./src/Components/temp/Quiz/index.js