import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Linking,
  Text,
  TextInput,
  StatusBar,
  View,
} from 'react-native'

import fetch from 'axios'
import vars from '../styles/vars'
import styles from '../styles/main'
import Items from '../components/items'

export default class ResultPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.route.text,
      items: [],
      loading: false
    }
  }

  componentDidMount() {
    this.handleSearch()
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
    const {navigator} = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={vars.mainColor}/>
        <TextInput
          style={styles.searchInput}
          value={this.state.text}
          placeholder="Type here to search modules..."
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => this.handleSearch()}
        />
      <Items items={this.state.items} navigator={navigator}/>
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
