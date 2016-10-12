import React from 'react'
import { connect } from 'react-redux'
import { storiesRequest, storiesReceived, storiesFailed, storiesInvalidated, fetchStoriesIfNeeded, selectEndpoint, ENDPOINT_OPTIONS } from '../actions/stories'
import Story from 'components/story'
import Selector from 'components/selector'
import { resetPagination, goNextPage, goPrevPage } from '../actions/pagination'

class App extends React.Component {

  constructor(props) {
    super(props)
    // bind event handlers to the instance
    this.handleEndpointChange = this.handleEndpointChange.bind(this)
  }

  // upon mounting, the app should fetch stories for the default endpoint
  componentDidMount() {
    const { dispatch, selectedEndpoint } = this.props
    dispatch(fetchStoriesIfNeeded(selectedEndpoint))
  }

  // helper for rendering stories in a keyed list
  renderStory(storyId) {
    return (
      <li key={storyId}>
        <Story storyId={storyId} />
      </li>
    )
  }

  // view helper - renders stories if IDs are loaded, otherwise returns nothing
  shouldRenderStories() {
    const {isFetching} = this.props
    if (!isFetching) {
      return this.renderStories()
    }
  }

  // renders the table of stories, along with pagination controls
  //  todo: break this out into a separate component
  renderStories() {
    const {stories, page, perPage, totalItems, maxPage, dispatch} = this.props

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


  // main rendering frame with endpoint selection control
  render () {
    const {stories, selectedEndpoint} = this.props
    const storiesCount = (stories) ? stories.length : 0
    const storyText = (storiesCount === 1) ? 'story' : 'stories'

    return (
      <div>
        <Selector value={selectedEndpoint} onChange={this.handleEndpointChange} options={ENDPOINT_OPTIONS} />
        <hr />
        <p>{storiesCount} {storyText} loaded for category {selectedEndpoint}</p>
        <hr />

        {this.shouldRenderStories()}
      </div>
    )
  }

  // event handler - fired when the Selector is changed by the user
  handleEndpointChange(nextEndpoint) {
    const {dispatch} = this.props
    dispatch(selectEndpoint(nextEndpoint))
  }

  // dispatch a new fetch if the user has changed the selected endpoint
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEndpoint !== this.props.selectedEndpoint) {
      const {dispatch, selectedEndpoint} = nextProps
      dispatch(fetchStoriesIfNeeded(selectedEndpoint))
    }
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
  // get relevant parts of the state
  const { storiesByEndpoint, selectedEndpoint, pagination } = state

  // extract relevant props from state for current endpoint
  const {
    isFetching,
    lastUpdated,
    items: stories
  } = storiesByEndpoint[selectedEndpoint] || {isFetching: true, items: [] }

  //pagination props
  const {page, perPage, totalItems, maxPage } = pagination

  // return props object to the app
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
