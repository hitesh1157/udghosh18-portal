import React from 'react';

function QuestionCount(props) {

  return (
    <div className="questionCount">
      <span>Question <span>{props.counter}</span> of <span>{props.total}</span></span>
      <span style={{ float: 'right', display:'inline !important' }} >Next question in: <strong >{props.timer}</strong></span>
    </div>
  );

}

QuestionCount.propTypes = {
  counter: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

export default QuestionCount;



// WEBPACK FOOTER //
// ./src/Components/temp/Quiz/components/QuestionCount.js