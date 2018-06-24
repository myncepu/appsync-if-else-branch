/*
 * index.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { graphql, compose } from 'react-apollo'

import GameList from './components/GameList'
import GameCreate from './components/GameCreate'
import mutationCreateGame from './graphql/mutationCreateGame'
import queryAllGames from './graphql/queryAllGames'
import subscriptionOnCreateGame from './graphql/subscriptionOnCreateGame'

export default class App extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <GameCreateWithData />
        <GameListWithData />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const GameListWithData = compose(
  graphql(queryAllGames, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: (result) => ({
      data: result.data,
      subscribeCreateGame: () => {
        result.data.subscribeToMore({
          document: subscriptionOnCreateGame,
          updateQuery: (previous, {subscriptionData: {data: {onCreateGame}}}) => ({
            ...previous,
            listGames: {
              ...previous.listGames,
              items: [
                onCreateGame,
                ...previous.listGames.items.filter(p => p.id != onCreateGame.id)
              ]
            }
          })
        })
      }
    })
  })
)(GameList)

const GameCreateWithData = compose(
  graphql(mutationCreateGame, {
    options: {
      refetchQueries: [{ query: queryAllGames }],
      update: (dataProxy, { data: { createGame } }) => {
        const query = queryAllGames
        const data = dataProxy.readQuery({ query })
        data.listGames.items = data.listGames.items.concat(createGame)
        dataProxy.writeQuery({ query, data })
      },
    },
    props: (props) => ({
      onCreate: (game) => {
        props.mutate({
          variables: { ...game },
          optimisticResponse: () => ({
            createGame: { ...game, __typename: 'Game' }
          })
        })
      }
    })
  })
)(GameCreate)
