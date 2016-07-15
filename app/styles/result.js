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
    height: 55,
    justifyContent: 'center',
    borderColor: 'red',
    backgroundColor: $.mainColor,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18
  }
})
