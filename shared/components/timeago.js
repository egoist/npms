import React, {Component} from 'react';
import {Text} from 'react-native';
import timeago from 'timeago.js';

export default class Timeago extends Component {
  constructor(props) {
    super(props);
  }
  getTime() {
    return timeago.format(this.props.since)
  }
  render() {
    return (
      <Text>
        {this.getTime()}
      </Text>
    )
  }
}
