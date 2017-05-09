import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chord } from 'tonal';

class ChordDetector extends Component {
  chords() {
    let chords = chord.detect(
      this.props.notes.map((n) => n.note).join(" ")
    );

    if (chords.length > 0) {
      return chords.map(
        (c, i) => {
          let joiner = i + 1 < chords.length ? " or " : '';
          return <span key={c} className="chord">{c + joiner}</span>;
        }
      );
    } else {
       return <span>No Chord Detected</span>
    }
  }

  render() {
    return <fieldset className="chord-detector controls">
      <div className="info">{this.chords()}</div>
    </fieldset>;
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
