import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PruebaActions from '../actions/PruebaActions';
import { fetchNeeds } from '../utils/fetchComponentData';
import { I18n } from 'react-i18nify';
class Selector extends Component {

  handleChange(e){
    console.log(e.target.value);
    PruebaActions.setLocale(e.target.value,this.props.dispatch);
  }

  render(){
    console.log('locale:',this.props.locale)
    return(
      <select onChange={this.handleChange.bind(this)} id="locale" value={this.props.locale}>
        <option value="nl">eu</option>
        <option value="en">en</option>
        <option value="es">es</option>
      </select>
    )
  }
}

class Container extends Component {

  static needs = [
    PruebaActions.readAll
  ];

  constructor(props, context) {
    super(props, context);
    this.actions = bindActionCreators(PruebaActions, props.dispatch);
  }

  componentDidMount() {
    fetchNeeds( Container.needs, this.props )
  }

  render() {
    return (
      <div title="Universal Redux Demo">
        <Selector {...this.props} />
        <span>{I18n.t('application.title')}</span>
        <span>{I18n.t('application.hello',{name:this.props.datos})}</span>
        <p>{I18n.l(1385856000000, { dateFormat: 'date.long' })}</p>
      </div>
    );
  }

};

export default connect( (state, ownProps) => ({ datos: state.prueba.get('datos'), locale: state.prueba.get('locale') }) )(Container);
