import React from 'react'
import { connect } from 'react-redux'
import { storyRequest, storyReceived, storyFailed, storyInvalidated, fetchStoryIfNeeded } from '../actions/story'

class Story extends React.Component {

  // upon mounting, request story data from the API (or cache, if it exists)
  componentDidMount(){
    const {dispatch, storyId} = this.props
    dispatch(fetchStoryIfNeeded(storyId))
  }

  render(){
    const {content, isFetching} = this.props

    if (!isFetching) {
      const myTitle = (content.deleted) ? '[DELETED]' : content.title
      return (
        <p>{myTitle}</p>
      )
    } else {
      return (
        <p>Loading&hellip;</p>
      )
    }
  }
}


Story.propTypes = {
  storyId: React.PropTypes.number.isRequired,
  content: React.PropTypes.object,
  isFetching: React.PropTypes.bool.isRequired,
  lastUpdated: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired
}


const mapStateToProps = (state, props) => {
  const { contentByStoryId } = state
  return contentByStoryId[props.storyId] || { isFetching:true }
}


export default connect(mapStateToProps)(Story);