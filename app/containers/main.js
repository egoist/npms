import React, {Component} from 'react'
import {
  View
} from 'react-native'
import styles from '../styles/main'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class MainPage extends Component {
  handleSearch() {
    this.props.navigator.push({
      name: 'result'
    })
  }

  render() {
    const { title } = this.props
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          navIconName="menu"
          onActionSelected={() => this.handleSearch()}
          actions={[
            {title: 'search', iconName: 'search', show: 'always'}
          ]}
          title={title}
          titleColor="#fff"
          style={styles.toolbar} />
      </View>
    )
  }
}

MainPage.defaultProps = {
  title: 'Home'
}
