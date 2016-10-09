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


// todo: this should check state for cached story and load from memory if possible... next step
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
