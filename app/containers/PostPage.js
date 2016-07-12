import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  WebView,
  ProgressBarAndroid
} from 'react-native'

import vars from '../styles/vars'
import styles from '../styles/main'
import Items from '../components/items'

export default class PostPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { url } = this.props
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: url}}/>
      </View>
    )
  }
}
