import React from 'react'
import { connect } from 'react-redux'
import { storiesRequest, storiesReceived, storiesFailed, storiesInvalidated, fetchStories } from '../actions/stories'
import Story from 'containers/story'
import { resetPagination, goNextPage, goPrevPage } from '../actions/pagination'

class App extends React.Component {


  componentDidMount() {
    const { dispatch, selectedEndpoint } = this.props
    dispatch(fetchStories(selectedEndpoint))
  }


  renderStory(storyId) {
    return (
      <li key={storyId}>
        <Story storyId={storyId} />
      </li>
    )
  }


  shouldRenderStories() {
    const {isFetching} = this.props

    if (!isFetching) {
      return this.renderStories()
    }
  }


  renderStories() {
    const {stories, page, perPage, totalItems, maxPage, dispatch} = this.props
    // const storiesCount = (stories) ? stories.length : 0
    // const storyText = (storiesCount === 1) ? 'story' : 'stories'

    //pagination calcs
    const minIndex = (page * perPage)
    const maxIndex = ((page + 1) * perPage)

    return (
      <div>
        <ol start={minIndex + 1}>
          {stories.slice(minIndex, maxIndex).map(this.renderStory)}
        </ol>

        <p>Page: {page + 1} of {maxPage + 1}</p>

        <div>
          <button onClick={e => dispatch(goPrevPage())}>Prev</button>
          <button onClick={e => dispatch(goNextPage())}>Next</button>
        </div>
      </div>
    )
  }





  render () {
    const {stories} = this.props
    const storiesCount = (stories) ? stories.length : 0
    const storyText = (storiesCount === 1) ? 'story' : 'stories'

    return (
      <div>
        <p>Hello React!</p>
        <p>{storiesCount} {storyText} loaded</p>

        {this.shouldRenderStories()}
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
  const { storiesByEndpoint, selectedEndpoint, pagination } = state
  const {
    isFetching,
    lastUpdated,
    items: stories
  } = storiesByEndpoint[selectedEndpoint] || {
    isFetching: true,
    items: []
  }

  //pagination props
  const {
    page, perPage, totalItems, maxPage
  } = pagination



  return {
    selectedEndpoint,
    stories,
    isFetching,
    lastUpdated,
    page,
    perPage,
    totalItems,
    maxPage
  }
}


export default connect(mapStateToProps)(App)
