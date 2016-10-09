import React from 'react'
import { connect } from 'react-redux'
import { storiesRequest, storiesReceived, storiesFailed, storiesInvalidated, fetchStories } from '../actions'


class App extends React.Component {


  componentDidMount() {
    const { dispatch, selectedEndpoint } = this.props
    dispatch(fetchStories(selectedEndpoint))
  }


  renderStory(storyId) {
    return (
      <li key={storyId}>{storyId}</li>
    )
  }


  render () {
    let {stories} = this.props
    let storiesCount = (stories) ? stories.length : 0
    let storyText = (storiesCount === 1) ? 'story' : 'stories'
    // let storiesText = `${storiesCount} stories loaded`

    return (
      <div>
        <p>Hello React!</p>
        <p>{storiesCount} {storyText} loaded</p>

        <ul>
          {stories.map(this.renderStory)}
        </ul>
      </div>
    )
  }
}


App.propTypes = {
  selectedEndpoint: React.PropTypes.string.isRequired,
  stories: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  lastUpdated: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired
}




const mapStateToProps = state => {
  const { storiesByEndpoint, selectedEndpoint } = state
  const {
    isFetching,
    lastUpdated,
    items: stories
  } = storiesByEndpoint[selectedEndpoint] || {
    isFetching: true,
    items: []
  }

  return {
    selectedEndpoint,
    stories,
    isFetching,
    lastUpdated
  }
}


export default connect(mapStateToProps)(App)
