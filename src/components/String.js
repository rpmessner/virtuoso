import React, { Component } from 'react';

export default class String extends Component {
  render() {
    return <div className="string">
      {this.props.children}
    </div>;
  }
}
