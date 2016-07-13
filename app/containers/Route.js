import React, {Component,PropTypes} from 'react'
import {
  View,
  Navigator,
  Platform,
  BackAndroid,
  ToastAndroid
} from 'react-native'
import MainPage from './MainPage'
import PostPage from './PostPage'
import ResultPage from './ResultPage'

export default class Route extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
	  if (Platform.OS === 'android') {
	    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid)
	  }
	}

  onBackAndroid = () => {
			const navigator = this.navigator
			const navigators = navigator.getCurrentRoutes()

				if (navigator && navigators.length > 1) {
						navigator.pop()
						return true
				}
				else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
					//最近2秒内按过back键，可以退出应用。
					return false
				}
				else {
				ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
				this.lastBackPressed = Date.now()

				return true
				}
		}

  renderScene = (route, navigator) => {
    if (route.name){
      switch (route.name) {
        case 'main' :
          return <MainPage navigator={navigator} route={route}/>
        case 'result':
          return <ResultPage navigator={navigator} route={route}/>
        default:
  			  const Component = route.component
      		return <Component {...route.passProps}/>
      }
    } else if(route.url) {
      return <PostPage navigator={navigator} url={route.url}/>
    }

  }

  renderConfigure = (route) => {
    return Navigator.SceneConfigs.FloatFromBottomAndroid
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Navigator
          ref={navigator => { this.navigator = navigator}}
				  renderScene={this.renderScene}
          configureScene={this.renderConfigure}
				  initialRoute={{
				  	name: 'main'
				  }}/>
      </View>
    )
  }
}
