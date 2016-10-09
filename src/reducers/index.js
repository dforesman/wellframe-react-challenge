import { combineReducers } from 'redux'
import {
  STORIES_REQUEST, STORIES_RECEIVED,
  STORIES_FAILED, STORIES_INVALIDATED,
  SELECT_ENDPOINT
} from '../actions'


const selectedEndpoint = (state = 'new', action) => {
  switch (action.type) {
    case SELECT_ENDPOINT:
      return action.endpoint
    default:
      return state
  }
}



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
        items: action.stories,
        lastUpdated: action.receivedAt
      }
    // todo: ADD ERROR HANDLING
    default:
      return state
  }
}

const storiesByEndpoint = (state = { }, action) => {
  switch (action.type) {
    case STORIES_INVALIDATED:
    case STORIES_RECEIVED:
    case STORIES_REQUEST:
      return {
        ...state,
        [action.endpoint]: stories(state[action.endpoint], action)
      }
    default:
      return state
  }
}




const rootReducer = combineReducers({
  storiesByEndpoint,
  selectedEndpoint
})

export default rootReducer