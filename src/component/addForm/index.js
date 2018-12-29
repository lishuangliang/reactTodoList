import React, {Component} from 'react';

class AddBox extends Component{
    handleChange(e){
      if(e.keyCode === 13){
        this.props.onAddList(e.target.value);
        e.target.value = '';
      }
    }
    render(){
      return (
        <div className="m-add-form">
          <input type="text" onKeyUp={this.handleChange.bind(this)}/>
          <button>add</button>
        </div>
      )
    }
}

export default AddBox;