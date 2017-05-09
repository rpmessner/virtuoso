import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { push } from 'react-router-redux';

class ModeSelector extends Component {
  selectedClass() {
    return this.isSelected() ? 'selected' : '';
  }

  isSelected() {
    return this.props.router.location.pathname === '/detector';
  }

  selectMode() {
    if (this.isSelected()) {
      this.props.selectMode('selector');
      this.setState({selected:false})
    } else {
      this.props.selectMode('detector');
      this.setState({selected:true})
    }
  }

  render() {
    return <div className="mode-selector"
                onClick={this.selectMode.bind(this)}>
              <span>Selector</span>
              <div className="switch">
                <div className={"toggle " + this.selectedClass()}></div>
              </div>
              <span>Detector</span>
           </div>;
  }
}

function mapStateToProps(state) {
  return { router: state.router };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMode(mode) {
      dispatch(push('/' + mode));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeSelector);
