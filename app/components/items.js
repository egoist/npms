import React, {Component} from 'react'
import {
  Linking,
  Text,
  View,
  ScrollView
} from 'react-native'
import timeago from 'timeago.js'
import styles from '../styles/items'

export default class Items extends Component {
  constructor(props) {
    super(props)
  }
  async openURL(url) {
    const supported = Linking.canOpenURL(url)
    if (supported) {
      Linking.openURL(url)
    } else {
      alert('Don\'t know how to open URI: ' + this.props.url)
    }
  }

  handlePress = (url) => {
    this.props.navigator.push({
      url:url
    })
  }

  scoreColor(score) {
    if (score > 0.8) return 'green'
    if (score > 0.6) return 'orange'
    return 'red'
  }

  render() {
    if (this.props.items.length === 0) {
      return <Text></Text>
    }
    return (
      <ScrollView>
        {this.props.items.map(item => {
          return (
            <View key={item.module.name} style={styles.item}>
              <View style={styles.itemHeading}>
                <Text
                  onPress={() => {
                    const url = item.module.links.repository || item.module.links.npm
                    this.handlePress(url)
                  }}
                  style={styles.itemTitle}>
                  {item.module.name}
                </Text>
                <Text style={styles.itemVersion}>
                  v{item.module.version}&nbsp;/&nbsp;
                  <Text style={{color: this.scoreColor(item.score.final)}}>{Math.round(item.score.final * 100)}</Text>
                </Text>
              </View>
              <Text style={styles.itemDescription}>{item.module.description || 'No description'}</Text>
              {item.module.keywords && (() => {
                return (
                  <View style={styles.itemKeywords}>
                    {item.module.keywords.slice(0, 3).map((keyword, index) => {
                      return (
                        <Text style={styles.itemKeyword} key={index}>{keyword}</Text>
                      )
                    })}
                  </View>
                )
              })()}
              <View>
                <Text style={styles.itemDate}>
                  Updated at {timeago().format(item.module.date)} by <Text onPress={() => this.handlePress(`https://www.npmjs.org/~${item.module.publisher.username}`)}>
                  {item.module.publisher.username}
                  </Text>
                </Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}
