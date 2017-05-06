import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectString from './SelectString';

class SelectNeck extends Component {
  render() {
    let reversedStrings = [...this.props.strings].reverse()

    return <div className="neck">{
      reversedStrings.map(
        (note) => <SelectString key={note}
                          openNote={note} /> 
      )
    }</div>;
  }
}

function mapStateToProps(state) {
  return { strings: state.strings };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectNeck);
