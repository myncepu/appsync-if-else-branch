/*
 * GameList.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import React, {Component} from 'react'
import {
  View,
  Text,
} from 'react-native'

class GameList extends Component {
  renderGame = game => {
    return (
      <Text key={game.id}>{game.name}</Text>
    )
  }

  render() {
    const {data} = this.props
    const games = data.listGames && data.listGames.items

    return (
      <View>
        {
          [].concat(games || [])
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(this.renderGame)
        }
      </View>
    )
  }
}

export default GameList
