export const SELECT_ENDPOINT = 'SELECT_ENDPOINT'

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


// todo: this should check state for cached stories and load from memory if possible... next step
export const fetchStories = (endpoint = 'new') => dispatch => {
  dispatch(storiesRequest(endpoint))
  return fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}stories.json`)
    .then(response => {
      console.warn(response)
      return response
    })
    .then(response => response.json())
    .then(json => dispatch(storiesReceived(endpoint, json)))
}

