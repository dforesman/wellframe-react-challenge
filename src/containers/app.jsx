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
      <li key={storyId} className='col-sm-12'>
        <Story storyId={storyId} />
      </li>
    )
  }

  // view helper - renders stories if IDs are loaded, otherwise returns nothing
  shouldRenderStories() {
    const {isFetching} = this.props
    if (!isFetching) {
      return this.renderStories()
    } else {
      return (
        <h2 className='story-list-heading'>Loading Stories&hellip; <i className='fa fa-spinner fa-spin'></i></h2>
      )
    }
  }


  // gets the appropriate heading text based on endpoint - 'newest', 'best', 'top'
  getLabelTitle(endpoint){
    switch (endpoint) {
      case 'new':
        return 'newest'
      default:
        return endpoint
    }
  }


  // renders a pager element. pass justified=false for a compact version
  renderPager(dispatch, justified = true){
    return (
      <nav className='story-list-pager'>
        <ul className='pager'>
          <li className={(justified) ? 'previous' : ''}>
            <a onClick={e => dispatch(goPrevPage())}>
              <i className='fa fa-chevron-left'></i>
              Prev
            </a>
          </li>
          <li className={(justified) ? 'next' : ''}>
            <a onClick={e => dispatch(goNextPage())}>
              Next
              <i className='fa fa-chevron-right'></i>
            </a>
          </li>
        </ul>
      </nav>
    )
  }


  // renders the table of stories, along with pagination controls
  renderStories() {
    const {stories, page, perPage, totalItems, maxPage, dispatch, selectedEndpoint} = this.props

    //pagination calcs
    const minIndex = (page * perPage)
    const maxIndex = ((page + 1) * perPage)
    const titleLabel = this.getLabelTitle(selectedEndpoint)

    return (
      <div className='row'>
        <div className='col-sm-12'>

          <div className='story-list-heading'>
            <h2>{titleLabel} {stories.length} Stories <small>Page {page+1} of {maxPage+1}</small></h2>
          </div>

          {this.renderPager(dispatch)}

          <ol start={minIndex + 1} className='row'>
            {stories.slice(minIndex, maxIndex).map(this.renderStory)}
          </ol>

          {this.renderPager(dispatch)}
        </div>
      </div>
    )
  }




  // main rendering frame with endpoint selection control
  render () {
    const {stories, selectedEndpoint} = this.props

    return (
      <div>
        <div className='navbar-default'>
          <div className='container'>
            <div className='navbar-header'>
              <span className='navbar-brand'>Hacker News</span>
            </div>

            <div className='navbar-form navbar-right'>
              <div className='form-group'>
                <label htmlFor='categorySelector'>Choose Category:&nbsp;</label>
                <Selector
                  value={selectedEndpoint}
                  onChange={this.handleEndpointChange}
                  options={ENDPOINT_OPTIONS}
                  name='categorySelector'
                  className='form-control category-selector'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          {this.shouldRenderStories()}
        </div>
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
