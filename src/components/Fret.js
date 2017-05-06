import React, { Component } from 'react';

export default class Fret extends Component {
  onClick() {
    this.props.selectFret(this.props.fret);
  }

  selectedClass() {
    return this.props.selected ? "selected" : "";
  }

  render() {
    return <div onClick={this.onClick.bind(this)}
                className={"fret " + this.selectedClass() }>
      {this.props.note}
    </div>;
  }
}

Fret.defaultProps = { selectFret() { }, selected: false, note: '' }