export const STORY_REQUEST = 'STORY_REQUEST'
export const STORY_RECEIVED = 'STORY_RECEIVED'
export const STORY_FAILED = 'STORY_FAILED'
export const STORY_INVALIDATED = 'STORY_INVALIDATED'



export const storyRequest = (storyId) => ({
  type: STORY_REQUEST,
  storyId
})


export const storyReceived = (storyId, json) => ({
  type: STORY_RECEIVED,
  storyId,
  storyContent: json,
  receivedAt: Date.now()
})

export const storyFailed = (storyId, err) => ({
  type: STORY_FAILED,
  storyId,
  error: err
})


export const storyInvalidated = storyId => ({
  type: STORY_INVALIDATED,
  storyId
})



// fetch a story from the API, given a story ID
export const fetchStory = (storyId) => dispatch => {
  dispatch(storyRequest(storyId))
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(storyReceived(storyId, json))
    })
}


// check if a given storyID is already loaded in the cache
const shouldFetchStory = (state, storyId) => {
  const story = state.contentByStoryId[storyId]
  if (!story) {return true}
  if (story.isFetching) {return false}
  return story.didInvalidate
}


// call this from view - will load a story either from cache or from API
export const fetchStoryIfNeeded = (storyId) => (dispatch, getState) => {
  if (shouldFetchStory(getState(), storyId)) {
    return dispatch(fetchStory(storyId))
  }
}
