import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Linking,
  Text,
  TextInput,
  StatusBar,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native'

import fetch from 'axios'
import vars from '../styles/vars'
import styles from '../styles/main'
import Items from '../components/items'

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
    const {navigator} = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={vars.mainColor}/>
        <TextInput
          style={styles.searchInput}
          placeholder="Type here to search modules..."
          placeholderTextColor="white"
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => this.handleSearch()}
        />
      </View>
    )
  }
}
