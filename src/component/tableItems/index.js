import React, {Component} from 'react';


class List extends Component{
  render(){
    return (
      <li className={'list ' + (this.props.list.unfresh ? 'warn' : '')}>
        <span>{this.props.list.text}</span>
        <button onClick={ ()=> {console.log('list id', this.props.list.id);}}>delete</button>
      </li>
    )
  }
}

class TableItems extends Component{
    
    render(){
      let listArray = [];
      
      listArray = this.props.items.filter(list => {
        return (list.text.indexOf(this.props.searchWord) === 0) && 
                (this.props.toggle ? !list.unfresh : true)
      })

    
      return (
        <ul className="m-items-container">
          {
            listArray.map( list => 
              <List list={list} key={list.id}/>
            )
          }
        </ul>
      )
    }
  }

  export default TableItems;