// document.write('search page')
import './css/search.less'
import React from 'react'
import ReactDOM from 'react-dom'
import bg from './image/timg.jpg'
import '../../common/index'
import { a } from './tree-shaking'
class Search extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      Text: null
    }
  }
  loadComponent() {
    import('./test.js').then((Text)=>{
      this.setState({
        Text: Text.default
      })
    });
  }
  render() {
    const funcA = a()
    const { Text } = this.state;
    return <div className="search-text">
      {
        Text ? <Text /> : null
      }
      {funcA}Search Text <img onClick={this.loadComponent.bind(this)} src={ bg } />
      </div>
  }
}

ReactDOM.render(<Search />, document.querySelector('#root'))