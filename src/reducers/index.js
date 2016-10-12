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


// actions for pagination
import {
  PAGE_NEXT, PAGE_PREV, PAGE_CHANGE, PAGE_RESET, PER_PAGE
} from '../actions/pagination'


////////////////////////////////////////////////////////////////////////////
// ENDPOINT reducer

const selectedEndpoint = (state = 'new', action) => {
  switch (action.type) {
    case SELECT_ENDPOINT:
      return action.endpoint
    default:
      return state
  }
}


////////////////////////////////////////////////////////////////////////////
// STORIES reducers

// ajax request/response actions
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

// index stories by ID, keyed under current endpoint ('new', 'top', etc)
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


////////////////////////////////////////////////////////////////////////////
// STORY reducers

// ajax request/response actions
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

// story content, indexed by story ID. caches can be shared across endpoints
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



////////////////////////////////////////////////////////////////////////////
// PAGINATION reducer

const pagination = (state = {}, action) => {
  switch (action.type) {
    case PAGE_RESET:
      return {
        ...state,
        perPage: PER_PAGE,
        page: 0,
        totalItems: action.itemCount,
        maxPage: Math.floor(action.itemCount / PER_PAGE)
      }
    case PAGE_NEXT:
      return {
        ...state,
        page: (state.page >= state.maxPage) ? 0 : (state.page + 1)
      }
    case PAGE_PREV:
      return {
        ...state,
        page: (state.page === 0) ? state.maxPage : (state.page - 1)
      }
    default:
      return state
  }
}


// compose our reducers for export to the application
const rootReducer = combineReducers({
  storiesByEndpoint,
  selectedEndpoint,
  contentByStoryId,
  pagination
})

export default rootReducer