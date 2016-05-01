import createReducer from '../utils/createReducer'
import Immutable from 'immutable'
import {PruebaState,setLocale} from '../stores/pruebaStore'

function DATA_SUCCESS( state, action )
{
  if(action.type == 'DATA_SUCCESS'){
    return state.update('datos',() => action.result.datos );
  }
  return state;
}

function DATA_LOCATION( state, action )
{
  if(action.type == 'DATA_LOCATION'){
    setLocale(action.locale);
    return state.update('locale',()=>action.locale);
  }
  return state;
}

const handlers =
{
  ['DATA_SUCCESS']: DATA_SUCCESS,
  ['DATA_LOCATION']: DATA_LOCATION,
}

export default createReducer(new PruebaState(), handlers);
