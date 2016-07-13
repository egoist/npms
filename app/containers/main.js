import React, {Component} from 'react'
import {
  TextInput,
  StatusBar,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import vars from '../styles/vars'
import styles from '../styles/main'

export default class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  handleSearch() {
    this.props.navigator.push({
      name: 'result',
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={vars.mainColor} />
        <TouchableOpacity
          onPress={()=> this.handleSearch()}
          style={styles.searchInput}>
          <Text style={styles.searchInputText}>
            "Type here to search modules..."
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
