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
    justifyContent: 'center',
    borderColor: 'red',
    backgroundColor: $.mainColor,
  },
  searchInputText: {
    fontSize: 16,
    color: '#fff',
    justifyContent: 'center',
  }
})
