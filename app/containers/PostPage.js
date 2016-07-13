import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  WebView,
  ProgressBarAndroid,
  TouchableOpacity
} from 'react-native'

import vars from '../styles/vars'
import styles from '../styles/main'
import Items from '../components/items'

export default class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.url,
      url: this.props.url,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
    }
  }

  onLoadEnd() {
    this.setState({loading: false})
  }

  goBack() {
    this.props.navigator.pop()
  }

  onNavigationStateChange(navState) {
    if (navState && navState.title) {
      this.setState({
        title: navState.title
      })
    }
  }

  render() {
    const { url } = this.state
    return (
      <View>
        <View style={styles.container}>
            <View style={pageStyles.title}>
              <Text style={pageStyles.titleText}>
                 {this.state.title}
              </Text>
            </View>
            <WebView
              style={pageStyles.webview}
              source={{uri: url}}
              onNavigationStateChange={(navState) => this.onNavigationStateChange(navState)}
              onLoadEnd={() => this.onLoadEnd()}/>
        </View>

      </View>
    )
  }
}

const pageStyles = StyleSheet.create({
  title: {
    backgroundColor: vars.mainColor,
    padding: 15,
    paddingLeft: 8,
    paddingRight: 8
  },
  titleText: {
    color: 'white',
    textAlign: 'center'
  },
  webview: {
    height: 750
  }
})
