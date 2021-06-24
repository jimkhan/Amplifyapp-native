import {
  ADD_REMOTE_STREAM,
  ADD_STREAM,
  MY_STREAM,
  COUNTER,
} from '../actions/types';

const initialState = {
  myStream: null,
  streams: [],
  remoteStreams: [],
  count: 0,
};

const videoReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case MY_STREAM:
      return {
        ...state,
        myStream: payload,
      };
    case ADD_STREAM:
      return {
        ...state,
        streams: [...state.streams, payload],
      };
    case ADD_REMOTE_STREAM:
      return {
        remoteStreams: [...state.remoteStreams, payload],
      };

    case COUNTER:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
export default videoReducer;
