import { describe, expect, it } from 'vitest'

import { normalizeTweetForReactTweet } from '../lib/tweet-utils'

describe('normalizeTweetForReactTweet', () => {
  it('fills missing tweet entity arrays before react-tweet enrichment', () => {
    const tweet = {
      entities: {
        user_mentions: [],
      },
    }

    const normalized = normalizeTweetForReactTweet(tweet as any)

    expect(normalized.entities).toMatchObject({
      hashtags: [],
      urls: [],
      user_mentions: [],
      symbols: [],
    })
  })

  it('also normalizes quoted tweet entities', () => {
    const tweet = {
      entities: {},
      quoted_tweet: {
        entities: {
          urls: [],
        },
      },
    }

    const normalized = normalizeTweetForReactTweet(tweet as any)

    expect(normalized.quoted_tweet?.entities).toMatchObject({
      hashtags: [],
      urls: [],
      user_mentions: [],
      symbols: [],
    })
  })
})
