import React, { Component } from 'react';

export default class Fret extends Component {
  render() {
    return <div className={"fret"}
                style={{width: this.props.width+'%'}}>
      {React.Children.only(this.props.children)}
    </div>;
  }
}

