import type { Tweet } from 'react-tweet/api'

type TweetLike = Tweet | NonNullable<Tweet['quoted_tweet']>

const normalizeTweetEntities = <T extends TweetLike>(tweet: T): T => {
  const entities = tweet.entities

  return {
    ...tweet,
    entities: {
      ...entities,
      hashtags: Array.isArray(entities?.hashtags) ? entities.hashtags : [],
      urls: Array.isArray(entities?.urls) ? entities.urls : [],
      user_mentions: Array.isArray(entities?.user_mentions)
        ? entities.user_mentions
        : [],
      symbols: Array.isArray(entities?.symbols) ? entities.symbols : [],
      media: Array.isArray(entities?.media) ? entities.media : undefined,
    },
  }
}

export const normalizeTweetForReactTweet = (tweet: Tweet): Tweet => ({
  ...normalizeTweetEntities(tweet),
  quoted_tweet: tweet.quoted_tweet
    ? normalizeTweetEntities(tweet.quoted_tweet)
    : tweet.quoted_tweet,
})
