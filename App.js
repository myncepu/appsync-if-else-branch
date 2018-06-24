import React from 'react'
import AWSAppSyncClient from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'

import App from './src'

const client = new AWSAppSyncClient({
  url: 'https://5nttx5afefao7myzaywtw2lkfi.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  region: 'ap-southeast-1',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-67e4tltf7zgijc4bbzwyuo2kje',
  }
})
export default class AppSyncApp extends React.Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <Rehydrated>
          <App/>
        </Rehydrated>
      </ApolloProvider>
    )
  }
}
