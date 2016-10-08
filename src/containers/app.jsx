import React from 'react'
import { connect } from 'react-redux'
import { storiesRequest, storiesReceived, storiesFailed, storiesInvalidated } from '../actions'


class App extends React.Component {

  componentDidMount() {
    const { dispatch, endpoint } = this.props
    dispatch(storiesRequest(endpoint))
  }


  render () {
    let storiesCount = (this.props.stories) ? this.props.stories.length() : 0
    // let storiesText = `${storiesCount} stories loaded`

    return (
      <div>
        <p>Hello React!</p>
        <p>{`${storiesCount} stories loaded`}</p>
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { endpoint, storiesList } = state
  const {
    isFetching,
    lastUpdated,
    items: stories
  } = storiesList || {
    isFetching: true,
    stories: []
  }

  return {
    endpoint,
    stories,
    isFetching,
    lastUpdated
  }
}


export default connect(mapStateToProps)(App)
