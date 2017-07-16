import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const ButtonIncrease = (props) => (
  <div>
    <button onClick={()=> handleClick(props, 1)}>Increase to {props.counter + 1}</button>
  </div>
);

function handleClick(props, int){
	props.actions.addNumber(int)
};

ButtonIncrease.contextTypes = {
	store: React.PropTypes.object
};

function mapStateToProps(state) {
  return { counter: state.counter }
};
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonIncrease);