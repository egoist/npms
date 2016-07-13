import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native'

import vars from '../styles/vars'
import styles from '../styles/main'

const pageStyles = StyleSheet.create({
  title: {
    backgroundColor: vars.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  titleText: {
    color: 'white',
    textAlign: 'center'
  },
  webview: {
  }
})

export default class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.url,
      url: this.props.url
    }
  }

  onLoadEnd() {
    this.setState({loading: false})
  }

  onNavigationStateChange(e) {
    if (e && e.title) {
      this.setState({
        title: e.title.length > 100 ?
          `${e.title.substr(0, 100)}...` :
          e.title
      })
    }
  }

  goBack() {
    this.props.navigator.pop()
  }

  render() {
    const {url} = this.state
    return (
      <View style={styles.container}>
        <View style={pageStyles.title}>
          <Text style={pageStyles.titleText}>
             {this.state.title}
          </Text>
        </View>
        <WebView
          source={{uri: url}}
          onNavigationStateChange={navState => this.onNavigationStateChange(navState)}
          onLoadEnd={() => this.onLoadEnd()} />
      </View>
    )
  }
}
