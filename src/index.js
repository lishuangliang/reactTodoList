import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './index.css';

import items from './mock/product';
import ProductTable from  './component/productTable/index';

class App extends Component{
  constructor(){
    super();
    this.state = {
      items : items
    }
  }
  addList(value){
    let items = this.state.items;
    let obj = {
      id : items.length ? Math.max(...items.map(list => list.id)) + 1 : 1,
      text : value,
      unfresh : true
    }
    this.setState({
      items : items.concat(obj)
    })
    
  }
  render(){
    return (
      <div className="container">
        <ProductTable items={this.state.items} onAddList={this.addList.bind(this)}/>
      </div>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('root')
)