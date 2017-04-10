import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], options: {}, indexLoading: false, loading: false, sortLoading: false, defaultLoading: false, selectedItem: {} };

export default function type(state = initialState, action) {
  switch (action.type) {
    case t.TYPE_INDEX:
      return { ...state, indexLoading: true, collection: [] };

    case t.TYPE_INDEX_SUCCESS:
      return { ...state, indexLoading: false, ecode: action.result.ecode, collection: action.result.data, options: action.result.options };

    case t.TYPE_INDEX_FAIL:
      return { ...state, indexLoading: false, error: action.error };

    case t.TYPE_CREATE:
      return { ...state, loading: true };

    case t.TYPE_CREATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection.push(action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.TYPE_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_UPDATE:
      return { ...state, loading: true };

    case t.TYPE_UPDATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        const ind = _.findIndex(state.collection, { id: action.result.data.id });
        state.collection[ind] = action.result.data;
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.TYPE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_SELECT:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, loading: false, selectedItem: el };

    case t.TYPE_DELETE:
      return { ...state, loading: true };

    case t.TYPE_DELETE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = _.reject(state.collection, { id: action.id });
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.TYPE_DELETE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_SET_SORT:
      return { ...state, sortLoading: true };

    case t.TYPE_SET_SORT_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = action.result.data;
      }
      return { ...state, sortLoading: false, ecode: action.result.ecode };

    case t.TYPE_SET_SORT_FAIL:
      return { ...state, sortLoading: false, error: action.error };

    case t.TYPE_SET_DEFAULT:
      return { ...state, defaultLoading: true };

    case t.TYPE_SET_DEFAULT_SUCCESS:
      return { ...state, defaultLoading: false, ecode: action.result.ecode, collection: action.result.data };

    case t.TYPE_SET_DEFAULT_FAIL:
      return { ...state, defaultLoading: false, error: action.error };

    default:
      return state;
  }
}
