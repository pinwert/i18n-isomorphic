import React, { Component, PropTypes } from 'react';
import DevTools from './DevTools';


export default class PruebaApp extends Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  render() {

    var tool = ( 'undefined' !== typeof window && true == window.$REDUX_DEVTOOL ) ? <DevTools/> : null;

    return (
      <div>
        {this.props.main}
        {tool}
      </div>
    )
  }
}
