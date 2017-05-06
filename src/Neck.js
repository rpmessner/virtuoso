import React, { Component } from 'react';
import { connect } from 'react-redux';

import String from './String';

class Neck extends Component {
  render() {
    return <div className="neck">{
      this.props.strings.map(
        (note) => <String key={note}
                          openNote={note} /> 
      )
    }</div>;
  }
}

function mapStateToProps(state) {
  return { strings: state.strings.reverse() };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Neck);
