'use client'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useAccount } from 'wagmi'


const API_URL = 'https://api-sandbox-mumbai.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})
const { address, isConnected, isDisconnected } = useAccount();
/* define a GraphQL query  */
export const defaultProfile = gql`
query DefaultProfile {
  defaultProfile(
    request: { ethereumAddress: ${address} }
  ) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
  }
}

`