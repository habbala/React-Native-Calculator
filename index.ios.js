
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const numbers = [['+', '-', '*', '/'],[1, 2, 3], [4, 5, 6], [7, 8, 9], ['Clear', 0, '=']];

export default class ReduxCalculator extends Component {
  constructor(props){
    super(props);

    this.state={
      inputValue: null,
      previousInputValue: null,
      selectedOperator: null,
      previousAnswer: null,
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <Text style={styles.previousInputText}>{this.state.previousAnswer}
          </Text>
          <Text style={styles.inputText}>{this.state.previousInputValue}
          {this.state.selectedOperator}{this.state.inputValue}</Text>
        </View>

        {this._renderInputButtons()}

      </View>
    );
  }

  _renderInputButtons(){
    let views = [];

    for(var j = 0; j < numbers.length; j++){
      let row = numbers[j];
      let inputRow = [];
      for(var i = 0; i < row.length; i++){
        let input = row[i];

        switch(typeof input){
          case 'number':
            inputRow.push(<NumberButton value={input} key={j + ':' + i} onPress={this._onInputButtonPressed.bind(this,input)}/>);
            break;

          default:
            inputRow.push(<InputButton value={input} key={j + ':' + i} onPress={this._onInputButtonPressed.bind(this,input)}/>);
            break;
        }

      }
      views.push(<View style={styles.numberRow}
        key={'numberRow: ' + j}>{inputRow}</View>);
    }

    return views;
  }

  _onInputButtonPressed(input){
    switch(typeof input){

      case 'number':
        let newInput = this.state.inputValue * 10 + input;
        this.setState({inputValue: newInput})
        break;

      default:
        switch(input){

          case 'Clear':
            this.setState({inputValue: null,
              previousInputValue: null,
              selectedOperator: null,
              });
            break;

          case '=':
            this.setState({
              previousInputValue: this.state.inputValue,
              previousAnswer: eval(this.state.previousInputValue +  this.state.selectedOperator + this.state.inputValue),
              inputValue: null,
              previousInputValue: null,
              selectedOperator: null,
            });
            break;

          case '+':
          case '-':
          case '*':
          case '/':
            this.setState({previousInputValue: this.state.inputValue,
              selectedOperator: input,
              inputValue: this.state.previousInputValue,
            });
            break;

        }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'rgba(55, 135, 230, 0.67)',
    marginTop: 20,
  },

  inputText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'right',
  },

  previousInputText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.51)',
    textAlign: 'right',
  },

  numberRow:{
    flex:1,
    flexDirection: 'row',
  },

  operatorText: {
    textAlign: 'center',
    color: '#85e2ff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  numberButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#505bee',
    borderWidth: 0.5,
    borderColor: 'rgba(3, 3, 3, 0.6)'
  },

  operatorButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1122be',
    borderWidth: 0.5,
    borderColor: 'rgba(3, 3, 3, 0.6)'
  }
});

class InputButton extends Component{

  render(){
    return(
      <TouchableHighlight style={styles.operatorButton} underlayColor="rgba(213, 236, 140, 0.34)" onPress={this.props.onPress}>
        <Text style={styles.operatorText}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }
}

class NumberButton extends Component{
  render(){
    return(
      <TouchableHighlight style={styles.numberButton} onPress={this.props.onPress} underlayColor="rgba(213, 236, 140, 0.34)">
        <Text style={styles.operatorText}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }
}

AppRegistry.registerComponent('ReduxCalculator', () => ReduxCalculator);
