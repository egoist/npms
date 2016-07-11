import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Linking,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import fetch from 'axios';
import timeago from 'timeago.js';

class Items extends Component {
  constructor(props) {
    super(props);
  }
  async openURL(url) {
    const supported = Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      alert('Don\'t know how to open URI: ' + this.props.url);
    }
  }
  scoreColor(score) {
    if (score > 0.8) return 'green'
    if (score > 0.6) return 'orange'
    return 'red'
  }
  render() {
    if (this.props.items.length === 0) {
      return <Text></Text>;
    }
    return (
      <ScrollView>
        {this.props.items.map(item => {
          return (
            <View key={item.module.name} style={styles.item}>
              <View style={styles.itemHeading}>
                <Text
                  onPress={() => {
                    const url = item.module.links.repository || item.module.links.npm;
                    this.openURL(url);
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
                      );
                    })}
                  </View>
                );
              })()}
              <View>
                <Text style={styles.itemDate}>
                  Updated at
                  &nbsp;{timeago().format(item.module.date)}&nbsp;
                  by <Text onPress={() => this.openURL(`https://www.npmjs.org/~${item.module.publisher.username}`)}>
                  {item.module.publisher.username}
                  </Text>
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

class npms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
      dataSource: {},
      loading: false
    };
  }
  async handleSearch(loadmore) {
    if (!loadmore) this.setState({items: []})

    this.setState({loading: true});
    const append = loadmore ?
      `&from=${this.state.items.length}` :
      `&from=0`;
    try {
      const data = await fetch(`https://api.npms.io/search?size=20&term=${this.state.text}${append}`);
      this.setState({items: data.data.results});
      this.setState({loading: false});
    } catch (e) {
      this.setState({loading: false});
    }
  }
  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}

const mainColor = '#35405b'
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    padding: 15,
  },
  loading: {
    padding: 15
  },
  searchInput: {
    height: 60,
    fontSize: 16,
    borderColor: 'red',
    backgroundColor: mainColor,
    color: '#fff',
    paddingLeft: 15
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2'
  },
  itemHeading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemKeywords: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
  itemKeyword: {
    marginRight: 5,
    fontSize: 12,
    lineHeight: 12,
    backgroundColor: '#f0f0f0',
    padding: 5,
    textAlign: 'center'
  },
  itemDescription: {
    color: '#333',
    marginTop: 5
  },
  itemVersion: {
    marginLeft: 5,
    fontSize: 13
  },
  itemDate: {
    marginTop: 5,
    fontSize: 12
  },
  itemTitle: {
    fontSize: 18,
    color: mainColor
  }
});

AppRegistry.registerComponent('npms', () => npms);
