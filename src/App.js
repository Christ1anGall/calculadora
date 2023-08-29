import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Button from './components/Button';
import Display from './components/Display';

const inicialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {...inicialState};

  addDigit = n => {
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    if (
      n === '.' &&
      !clearDisplay &&
      String(this.state.displayValue).includes('.')
    ) {
      return;
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({displayValue, clearDisplay: false});

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];

      values[this.state.current] = newValue;
      this.setState({values});
    }
  };

  clearMemory = () => {
    this.setState({...inicialState});
  };
  setOperation = operation => {
    if (this.state.operation === 0) {
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        // eslint-disable-next-line no-eval
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (error) {
        values[0] = this.state.values[0];
      }

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label={'AC'} triple onclick={this.clearMemory} />
          <Button operation label={'/'} onclick={this.setOperation} />

          <Button label={'7'} onclick={this.addDigit} />
          <Button label={'8'} onclick={this.addDigit} />
          <Button label={'9'} onclick={this.addDigit} />

          <Button operation label={'*'} onclick={this.setOperation} />

          <Button label={'4'} onclick={this.addDigit} />
          <Button label={'5'} onclick={this.addDigit} />
          <Button label={'6'} onclick={this.addDigit} />

          <Button operation label={'-'} onclick={this.setOperation} />

          <Button label={'1'} onclick={this.addDigit} />
          <Button label={'2'} onclick={this.addDigit} />
          <Button label={'3'} onclick={this.addDigit} />

          <Button operation label={'+'} onclick={this.setOperation} />

          <Button label={'0'} double onclick={this.addDigit} />

          <Button label={'.'} onclick={this.addDigit} />
          <Button operation label={'='} onclick={this.setOperation} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
