// document.write('search page')
import './css/search.less'
import React from 'react'
import ReactDOM from 'react-dom'
import bg from './image/timg.jpg'

class Search extends React.Component {
  render() {
    return <div className="search-text">
      Search Text <img src={ bg } />
      </div>
  }
}

ReactDOM.render(<Search />, document.querySelector('#root'))