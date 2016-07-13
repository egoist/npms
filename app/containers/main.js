import React, {Component} from 'react'
import {
  TextInput,
  StatusBar,
  View
} from 'react-native'

import vars from '../styles/vars'
import styles from '../styles/main'

export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  async handleSearch() {
    this.props.navigator.push({
      name: 'result',
      text: this.state.text
    })
    this.setState({
      text: ''
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={vars.mainColor} />
        <TextInput
          style={styles.searchInput}
          placeholder="Type here to search modules..."
          placeholderTextColor="white"
          value={this.state.text}
          onChangeText={text => this.setState({text})}
          onSubmitEditing={() => this.handleSearch()} />
      </View>
    )
  }
}
