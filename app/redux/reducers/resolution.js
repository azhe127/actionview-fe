import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], indexLoading: false, loading: false, itemLoading: false, sortLoading: false, defaultLoading: false, selectedItem: {} };

export default function resolution(state = initialState, action) {
  switch (action.type) {
    case t.RESOLUTION_INDEX:
      return { ...state, indexLoading: true, collection: [] };

    case t.RESOLUTION_INDEX_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = action.result.data;
      }
      return { ...state, indexLoading: false, ecode: action.result.ecode };

    case t.RESOLUTION_INDEX_FAIL:
      return { ...state, indexLoading: false, error: action.error };

    case t.RESOLUTION_CREATE:
      return { ...state, loading: true };

    case t.RESOLUTION_CREATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection.push(action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.RESOLUTION_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.RESOLUTION_UPDATE:
      return { ...state, loading: true };

    case t.RESOLUTION_UPDATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        const ind = _.findIndex(state.collection, { id: action.result.data.id });
        _.extend(state.collection[ind], action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.RESOLUTION_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.RESOLUTION_SELECT:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, itemLoading: false, selectedItem: el };

    case t.RESOLUTION_DELETE:
      return { ...state, itemLoading: true };

    case t.RESOLUTION_DELETE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = _.reject(state.collection, { id: action.id });
      }
      return { ...state, itemLoading: false, ecode: action.result.ecode };

    case t.RESOLUTION_DELETE_FAIL:
      return { ...state, itemLoading: false, error: action.error };

    case t.RESOLUTION_SET_SORT:
      return { ...state, sortLoading: true };

    case t.RESOLUTION_SET_SORT_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = action.result.data;
      }
      return { ...state, sortLoading: false, ecode: action.result.ecode };

    case t.RESOLUTION_SET_SORT_FAIL:
      return { ...state, sortLoading: false, error: action.error };

    case t.RESOLUTION_SET_DEFAULT:
      return { ...state, defaultLoading: true };

    case t.RESOLUTION_SET_DEFAULT_SUCCESS:
      if (action.result.ecode === 0) {
        state.collection = action.result.data;
      }
      return { ...state, defaultLoading: false, ecode: action.result.ecode };

    case t.RESOLUTION_SET_DEFAULT_FAIL:
      return { ...state, defaultLoading: false, error: action.error };

    default:
      return state;
  }
}
