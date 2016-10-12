import { resetPagination } from './pagination'


export const SELECT_ENDPOINT = 'SELECT_ENDPOINT'
export const ENDPOINT_OPTIONS = ['new', 'top', 'best']

export const STORIES_REQUEST = 'STORIES_REQUEST'
export const STORIES_RECEIVED = 'STORIES_RECEIVED'
export const STORIES_FAILED = 'STORIES_FAILED'
export const STORIES_INVALIDATED = 'STORIES_INVALIDATED'


export const selectEndpoint = endpoint => ({
  type: SELECT_ENDPOINT,
  endpoint
})


export const storiesRequest = (endpoint = 'new') => ({
  type: STORIES_REQUEST,
  endpoint
})


export const storiesReceived = (endpoint, json) => ({
  type: STORIES_RECEIVED,
  endpoint,
  stories: json,
  receivedAt: Date.now()
})

export const storiesFailed = (endpoint, err) => ({
  type: STORIES_FAILED,
  endpoint,
  error: err
})


export const storiesInvalidated = endpoint => ({
  type: STORIES_INVALIDATED,
  endpoint
})




// loads 'top 500' story IDs from the user's chosen endpoint
export const fetchStories = (endpoint = 'new') => dispatch => {
  dispatch(storiesRequest(endpoint))
  return fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}stories.json`)
    .then(response => response.json())
    .then(json => {
      // todo: look into if double-dispatching is standard redux practice
      dispatch(storiesReceived(endpoint, json))
      dispatch(resetPagination(json.length))
    })
}


// checks if story IDs for an endpoint are already loaded, or in the process of loading
//  helper for fetchStoriesIfNeeded
const shouldFetchStories = (state, endpoint = 'new') => {
  const stories = state.storiesByEndpoint[endpoint]
  if (!stories) {return true}
  if (stories.isFetching) {return false}
  return stories.didInvalidate
}


// cached story load - call this from view. Will pull appropriate stories from the cache or load them via API
export const fetchStoriesIfNeeded = (endpoint = 'new') => (dispatch, getState) => {
  const state = getState()
  if (shouldFetchStories(state, endpoint)) {
    return dispatch(fetchStories(endpoint))
  } else {
    // reset our pagination if we're pulling from the cache, as the reset won't be triggered by an ajax load
    dispatch(resetPagination(state.storiesByEndpoint[endpoint].items.length))
  }
}
