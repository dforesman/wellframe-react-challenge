import React from 'react'
import { connect } from 'react-redux'
import { storyRequest, storyReceived, storyFailed, storyInvalidated, fetchStoryIfNeeded } from '../actions/story'
import moment from 'moment'



class Story extends React.Component {

  // upon mounting, request story data from the API (or cache, if it exists)
  componentDidMount(){
    const {dispatch, storyId} = this.props
    dispatch(fetchStoryIfNeeded(storyId))
  }


  renderLoading(){
    return (
      <div className='panel'>
        <div className='panel-heading'>
          Loading <i className='fa fa-spinner fa-spin'></i>
        </div>
      </div>
    )
  }


  render(){
    const {content, isFetching} = this.props

    if (!isFetching) {
      const myTitle = (content.deleted) ? '[DELETED]' : content.title

      const userUrl = `https://news.ycombinator.com/user?id=${content.by}`
      const itemUrl = `https://news.ycombinator.com/item?id=${content.id}`

      return (


        <div className='story'>
          <h4>
            <a href={content.url} target="_blank">
              {myTitle}
            </a>
          </h4>
          <p>
            <span>{content.score} Points | Posted by </span>
            <a href={userUrl} target='_blank'>
              {content.by}
            </a>
            <span> {moment(content.time, "X").fromNow()} | </span>
            <a href={itemUrl} target='_blank'>
              {content.descendants} Comments
            </a>
          </p>
        </div>
      )
    } else {
      return this.renderLoading()
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