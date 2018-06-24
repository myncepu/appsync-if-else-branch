/*
 * game.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react'
import { Text } from 'react-native'

class Game extends Component {
  render() {
    let gameName = this.props.game && this.props.game.name

    return (
      <Text>Game: { gameName }</Text>
    )
  }
}

export default Game
