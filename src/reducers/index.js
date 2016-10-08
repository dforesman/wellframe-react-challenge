import { combineReducers } from 'redux'
import {
  STORIES_REQUEST, STORIES_RECEIVED,
  STORIES_FAILED, STORIES_INVALIDATED
} from '../actions'


const stories = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case STORIES_INVALIDATED:
      return {
        ...state,
        didInvalidate: true
      }
    case STORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case STORIES_RECEIVED:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        stories: action.stories,
        lastUpdated: action.receivedAt
      }
    // todo: ADD ERROR HANDLING
    default:
      return state
  }
}

const rootReducer = combineReducers({
  stories
})

export default rootReducer