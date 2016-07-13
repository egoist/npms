import React, {Component} from 'react'
import {
  Text,
  TextInput,
  StatusBar,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'

import fetch from 'axios'
import vars from '../styles/vars'
import styles from '../styles/main'
import Items from '../components/items'

export default class ResultPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      items: [],
      loading: false,
      serchHistory: [],
      onFocus: false
    }
  }

  async componentDidMount() {
    this.getItem('history')
    this.textInput.focus()
  }

  async setItem(item) {
    const serchHistory = this.state.serchHistory
    serchHistory.push(item)

    await AsyncStorage.setItem('history', JSON.stringify(serchHistory))
  }

  async getItem(item) {
    const history = await AsyncStorage.getItem(item)
    if (history) {
      this.setState({
        serchHistory: JSON.parse(history).reverse()
      })
    }
  }

  async removeItem(item) {
    await AsyncStorage.removeItem(item)
    this.setState({serchHistory: []})
  }

  async handleSearch(loadmore) {
    this.setItem(this.state.text)
    if (!loadmore) this.setState({items: []})

    this.setState({loading: true})
    const append = loadmore ?
      `&from=${this.state.items.length}` :
      '&from=0'
    try {
      const data = await fetch(`https://api.npms.io/search?size=20&term=${this.state.text}${append}`)
      this.setState({items: data.data.results})
      this.setState({loading: false})
    } catch (e) {
      this.setState({loading: false})
    }
    this.textInput.blur()
  }

  async handleHistorySearch(text) {
    this.setState({loading: true})

    try {
      const data = await fetch(`https://api.npms.io/search?size=20&term=${text}&from=0`)
      this.setState({items: data.data.results})
      this.setState({loading: false})
    } catch (e) {
      this.setState({loading: false})
    }
    this.textInput.blur()
  }

  render() {
    const {navigator} = this.props
    const {text, items, serchHistory, onFocus, loading} = this.state

    const historylist = serchHistory && serchHistory.map((o, i) =>
      <TouchableOpacity
        style={{alignItems: 'center'}}
        key={i}
        onPress={() => this.handleHistorySearch(o)}>
        <Text>{o}</Text>
      </TouchableOpacity>
    )
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={vars.mainColor} />
        <TextInput
          ref={textInput => { this.textInput = textInput }}
          style={styles.searchInput}
          value={text}
          placeholder="Type here to search modules..."
          placeholderTextColor="white"
          onFocus={() => this.setState({onFocus: true})}
          onBlur={() => this.setState({onFocus: false})}
          onChangeText={t => this.setState({text: t})}
          onSubmitEditing={() => this.handleSearch()} />
        <Items items={items} navigator={navigator} />

        {!loading && onFocus && items.length === 0 && serchHistory.length > 0 &&
          <View style={styles.historyBox}>
            {historylist}
            <TouchableOpacity
              style={{alignItems: 'center', marginTop: 20}}
              onPress={() => this.removeItem('history')}>
              <Text>Clear History</Text>
            </TouchableOpacity>
          </View>
        }

        {!onFocus && !loading && items.length === 0 && (() => {
          return (
            <View style={styles.emptyState}>
              <Text>Nothing matches!</Text>
            </View>
          )
        })()}
        {loading && (() => {
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
