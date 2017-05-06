import React, { Component } from 'react';
import { connect } from 'react-redux';
import tonal, { chord } from 'tonal';

class ChordDetector extends Component {
  render() {

    let chords = chord.detect(
      this.props.notes.map((n) => n.note).join(" ")
    );

    return <div className="chord-detector">{
      chords.map((c) => <div className="chord">{c}</div>)
    }</div>;
  }
}

function mapStateToProps(state) {
  return { notes: state.notes };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChordDetector);
