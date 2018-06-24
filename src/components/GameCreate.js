/*
 * GameCreate.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  RkTextInput,
  RkButton,
} from 'react-native-ui-kitten'
import uuidv4 from 'uuid/v4'

class GameCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  handleCreateGame = () => {
    this.props.onCreate({
      name: this.state.name,
      id: uuidv4()
    })
  }

  render() {
    return (
      <View>
        <RkTextInput
          rkType='bordered'
          onChangeText={ name => { this.setState({ name }) } }
          placeholder='Game Name'
        />
        <RkButton onPress={ this.handleCreateGame }>
          Create Game
        </RkButton>
      </View>
    )
  }
}

export default GameCreate
