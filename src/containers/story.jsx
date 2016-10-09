import React from 'react'
import { connect } from 'react-redux'
import { storyRequest, storyReceived, storyFailed, storyInvalidated, fetchStory } from '../actions/story'

class Story extends React.Component {

  componentDidMount(){
    const {dispatch, storyId} = this.props
    dispatch(fetchStory(storyId))
  }

  render(){
    if (!this.props.isFetching) {
      return (
        <p>{this.props.content.title}</p>
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