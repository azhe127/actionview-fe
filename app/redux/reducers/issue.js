import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], item: {}, options: {}, indexLoading: false, optionsLoading: false, searchLoading: false, loading: false, itemLoading: false, selectedItem: {} };

export default function issue(state = initialState, action) {
  switch (action.type) {
    case t.ISSUE_INDEX:
      return { ...state, indexLoading: true, collection: [] };

    case t.ISSUE_INDEX_SUCCESS:
      _.assign(state.options, action.result.options || {});
      return { ...state, indexLoading: false, ecode: action.result.ecode, collection: action.result.data };

    case t.ISSUE_INDEX_FAIL:
      return { ...state, indexLoading: false, error: action.error };

    case t.ISSUE_OPTIONS:
      return { ...state, optionsLoading: true };

    case t.ISSUE_OPTIONS_SUCCESS:
      return { ...state, optionsLoading: false, ecode: action.result.ecode, options: action.result.data };

    case t.ISSUE_OPTIONS_FAIL:
      return { ...state, optionsLoading: false, error: action.error };

    case t.ISSUE_CREATE:
      return { ...state, loading: true };

    case t.ISSUE_CREATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection.unshift(action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.ISSUE_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.ISSUE_EDIT:
      return { ...state, loading: true };

    case t.ISSUE_EDIT_SUCCESS:
      if ( action.result.ecode === 0 ) {
        const ind = _.findIndex(state.collection, { id: action.result.data.id });
        state.collection[ind] = action.result.data;
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.ISSUE_EDIT_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.ISSUE_SHOW:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, itemLoading: false, selectedItem: el };

    case t.ISSUE_DELETE_NOTIFY:
      const el2 = _.find(state.collection, { id: action.id });
      return { ...state, itemLoading: false, selectedItem: { id: el2.id, name: el2.name } };

    case t.ISSUE_DELETE:
      return { ...state, itemLoading: true };

    case t.ISSUE_DELETE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = _.reject(state.collection, { id: action.id });
      }
      return { ...state, itemLoading: false, ecode: action.result.ecode };

    case t.ISSUE_DELETE_FAIL:
      return { ...state, itemLoading: false, error: action.error };

    case t.ISSUE_SEARCHER_ADD:
      return { ...state, searcherLoading: true };

    case t.ISSUE_SEARCHER_ADD_SUCCESS:
      if ( action.result.ecode === 0 ) {
        if (!state.options.searchers) {
          state.options.searchers = [];
        }
        state.options.searchers.push(action.result.data);
      }
      return { ...state, searcherLoading: false, ecode: action.result.ecode };

    case t.ISSUE_SEARCHER_ADD_FAIL:
      return { ...state, searcherLoading: false, error: action.error };

    case t.ISSUE_SEARCHER_DELETE:
      return { ...state, searcherLoading: true };

    case t.ISSUE_SEARCHER_DELETE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.options.searchers = _.reject(state.options.searchers, { id: action.id });
      }
      return { ...state, searcherLoading: false, ecode: action.result.ecode };

    case t.ISSUE_SEARCHER_DELETE_FAIL:
      return { ...state, searcherLoading: false, error: action.error };

    default:
      return state;
  }
}
