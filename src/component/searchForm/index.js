import React, {Component} from 'react';

class SearchBox extends Component{
    constructor(){
      super()
    }
  
    handerChange(e){
      //this.props.onSearchWordChange(e.target.value)
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      this.props.onSearchFormChange(value, target.type);
    }
  
    render(){
      return (
        <div className="m-search-form">
          <input type="text" value={this.props.searchWord} onChange={this.handerChange.bind(this)}/>
          <br/>
          <input type="checkbox" checked={this.props.toggle} onChange={this.handerChange.bind(this)}/>
          <label>filter unfresh proudct?</label>
          <div className="clear-searchWord" 
              style={{display:this.props.searchWord ? 'block' : 'none'}}
              onClick={this.props.onClearSearchWorld}></div>
        </div>
      )
    }
  }

  export default SearchBox;