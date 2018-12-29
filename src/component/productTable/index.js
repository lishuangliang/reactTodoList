import React, {Component} from 'react';

import AddBox from '../addForm/index';
import SearchBox from '../searchForm/index';
import TableItems from '../tableItems/index';


class ProductTable extends Component{
    constructor(){
      super();
      this.state = {
        searchWord : '',
        toggle : false
      }
    }
  
    onSearchFormChange(value, type){
      if(type === 'text'){
        this.setState({
          searchWord : value
        });
      }else{
        this.setState({
          toggle : value
        })
      }
    }
    clearSearchWord(){
      this.setState({
        searchWord : ''
      })
    }
    //list.text.indexOf(this.state.searchWord) === 0 && (this.state.toggle ? !list.unfresh : true)

    render(){
      return (
        <div className="m-product-table">
          <AddBox onAddList={this.props.onAddList}/>
          <SearchBox 
            searchWord={this.state.searchWord} 
            toggle={this.state.toggle}
            onClearSearchWorld={this.clearSearchWord.bind(this)}
            onSearchFormChange={this.onSearchFormChange.bind(this)}/>
  
          
          <TableItems items={this.props.items}
                      searchWord={this.state.searchWord}
                      toggle={this.state.toggle}/>
        </div>
      )
    }
  }

  export default ProductTable;