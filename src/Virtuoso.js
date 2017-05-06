import React, { Component } from 'react';
import { connect } from 'react-redux';
import Neck from './Neck';
import ChordDetector from './ChordDetector';

class Virtuoso extends Component {
  render() {
    return (
      <div className="virtuoso">
        <Neck />
        <ChordDetector />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Virtuoso);
