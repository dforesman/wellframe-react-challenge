import { combineReducers } from 'redux'

// actions for story collections
import {
  STORIES_REQUEST, STORIES_RECEIVED,
  STORIES_FAILED, STORIES_INVALIDATED,
  SELECT_ENDPOINT
} from '../actions/stories'


// actions for individual stories
import {
  STORY_REQUEST, STORY_RECEIVED,
  STORY_FAILED, STORY_INVALIDATED
} from '../actions/story'



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


////////////////////// STORY reducers


const story = (state = {
  isFetching: false,
  didInvalidate: false,
  content: {}
}, action) => {
  switch (action.type) {
    case STORY_INVALIDATED:
      return {
        ...state,
        didInvalidate: true
      }
    case STORY_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case STORY_RECEIVED:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        content: action.storyContent,
        lastUpdated: action.receivedAt
      }
    // todo: ADD ERROR HANDLING
    default:
      return state
  }
}

const contentByStoryId = (state = { }, action) => {
  switch (action.type) {
    case STORY_INVALIDATED:
    case STORY_RECEIVED:
    case STORY_REQUEST:
      return {
        ...state,
        [action.storyId]: story(state[action.storyId], action)
      }
    default:
      return state
  }
}







const rootReducer = combineReducers({
  storiesByEndpoint,
  selectedEndpoint,
  contentByStoryId
})

export default rootReducer