/*
 * getGameQuery.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */
import gql from 'graphql-tag'

export default gql`
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
    }
  }
`
