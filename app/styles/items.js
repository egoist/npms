import {StyleSheet} from 'react-native'
import $ from './vars'

export default StyleSheet.create({
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
    color: $.mainColor
  }
})
