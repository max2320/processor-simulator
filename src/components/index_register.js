import React, {Component}  from 'react';
import Register from './register';

default export class IndexRegister extends Component {
  constructor(props, context) {
    super(props, context);
  
    this.state = {
      index: 0
    }

    this.registers = [];
  
    for(var i = 0; i < this.props.indexes; i++ ){
      this.registers.push((<Register name={i} >));
    }
  }

  select(index){
    this.setState({
      index: 0
    })
  }

  selected(){
    return this.registers[this.state.index];
  }

  write(value){
    this.selected().write(value);
  }

  read(){
    this.registers.read();
  }

  render(){
    return (
      <div className="index-register"
        style={this.props.style} >
        <div className="index-register__title">
          { this.props.name }
        </div>
        
        <div className="index-register__list">
          { this.registers }     
        </div>
      </div>
    );
  }
}