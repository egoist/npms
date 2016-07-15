import React, {Component} from 'react'
import {
  View,
  Navigator,
  Platform,
  BackAndroid,
  ToastAndroid,
  StatusBar
} from 'react-native'
import MainPage from './main'
import PostPage from './post'
import ResultPage from './result'
import vars from '../styles/vars'

export default class Route extends Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }

  onBackAndroid = () => {
    const navigator = this.navigator
    const navigators = navigator.getCurrentRoutes()

    if (navigators.length > 1) {
      navigator.pop()
      return true
    } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false
    }

    ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT)
    this.lastBackPressed = Date.now()

    return true
  }

  renderScene = (route, navigator) => {
    if (route.name) {
      switch (route.name) {
      case 'main' :
        return <MainPage navigator={navigator} route={route} />
      case 'result':
        return <ResultPage navigator={navigator} route={route} />
      default:
        return <View />
      }
    } else if (route.url) {
      return <PostPage navigator={navigator} url={route.url} />
    }
    return <View />
  }

  renderConfigure() {
    return Navigator.SceneConfigs.FloatFromBottomAndroid
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={vars.mainColor} />
        <Navigator
          ref={navigator => { this.navigator = navigator}} // eslint-disable-line
          renderScene={this.renderScene}
          configureScene={this.renderConfigure}
          initialRoute={{
            name: 'main'
          }} />
      </View>
    )
  }
}
