import React, { Component } from 'react';

export default class Note extends Component {
  constructor() {
    super()
    this.state = { hover: false }
  }

  selectedClass() {
    return this.props.selected ? "selected" : "";
  }

  onMouseEnter() {
    this.setState({hover:true});
  }

  onMouseLeave() {
    this.setState({hover:false});
  }

  render() {
    return <div onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                className={"note " + this.selectedClass()}
                onClick={this.props.onClick}>{this.props.interval && this.state.hover ? this.props.interval : this.props.pitch}</div>
  }
}
