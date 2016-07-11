import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Linking,
  Text,
  TextInput,
  StatusBar,
  View
} from 'react-native'
import fetch from 'axios'
import vars from './app/styles/vars'
import styles from './app/styles/main'
import Items from './app/components/items'

class npms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      items: [],
      dataSource: {},
      loading: false
    }
  }
  async handleSearch(loadmore) {
    if (!loadmore) this.setState({items: []})

    this.setState({loading: true})
    const append = loadmore ?
      `&from=${this.state.items.length}` :
      `&from=0`
    try {
      const data = await fetch(`https://api.npms.io/search?size=20&term=${this.state.text}${append}`)
      this.setState({items: data.data.results})
      this.setState({loading: false})
    } catch (e) {
      this.setState({loading: false})
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={vars.mainColor}/>
        <TextInput
          style={styles.searchInput}
          placeholder="Type here to search modules..."
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => this.handleSearch()}
        />
        <Items items={this.state.items}/>
        {!this.state.loading && this.state.items.length === 0 && (() => {
          return (
            <View style={styles.emptyState}>
              <Text>Nothing matches!</Text>
            </View>
          )
        })()}
        {this.state.loading && (() => {
          return (
            <View style={styles.loading}>
              <Text>Loading...</Text>
            </View>
          )
        })()}
      </View>
    )
  }
}

AppRegistry.registerComponent('npms', () => npms)
