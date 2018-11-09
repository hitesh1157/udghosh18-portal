import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {FlatButton} from "material-ui";
import {Link} from "react-router-dom";

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <h2>Your answers have been submitted successfully. We will inform you if you are short listed for the third stage to be held at IIT Kanpur. You may now close the window.</h2>
        </div>

        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 15}}>
        <FlatButton
              label="Close"
              onClick={() => { 
                window.close();
               }}
            />
        </div>

      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
};

export default Result;



// WEBPACK FOOTER //
// ./src/Components/temp/Quiz/components/Result.js