import {StyleSheet} from 'react-native'
import $ from './vars'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  emptyState: {
    padding: 15
  },
  loading: {
    padding: 15
  },
  searchInput: {
    height: 60,
    fontSize: 16,
    borderColor: 'red',
    backgroundColor: $.mainColor,
    color: '#fff',
    paddingLeft: 15
  }
})
