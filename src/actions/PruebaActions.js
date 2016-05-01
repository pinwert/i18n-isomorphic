import WebAPIUtils from '../utils/WebAPIUtils'

const DATA_REQUEST = 'DATA_REQUEST';
const DATA_SUCCESS = 'DATA_SUCCESS';
const DATA_ERROR = 'DATA_ERROR';

const DATA_LOCATION = 'DATA_LOCATION';

export function readAll() {
  console.log( 'readAll run' )
  return {
    types: [DATA_REQUEST,DATA_SUCCESS,DATA_ERROR],
    promise: WebAPIUtils.getAll()
  };
}

export function setLocale(locale,dispatch) {
  console.log( 'setLocation run' )
  const action = {
    type: DATA_LOCATION,
    locale: locale
  }
  dispatch(action);
}
