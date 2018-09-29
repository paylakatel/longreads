// import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Layout from '../components/Layout.js';

export default class extends React.Component {
  static async getInitialProps() {
    const options = {
      consumerKey: process.env.CONSUMER_KEY,
      accessToken: process.env.ACCESS_TOKEN,
      favorite: 1,
      sort: 'newest',
      detailType: 'complete',
    };

    const response = await fetch(
      `https://getpocket.com/v3/get?consumer_key=${
        options.consumerKey
      }&access_token=${options.accessToken}&favorite=${
        options.favorite
      }&detailType=${options.detailType}&sort=${options.sort}`
    );
    const data = await response.json();

    // We map over each article and grab just the data we need
    const articles = await Object.entries(data.list)
      .map(item => {
        // The object with the metadata for each article is the
        // second item in each array so we grab it
        const article = item[1];

        let rgb = '';

        // An article can have multiple authors or no authors (probably
        // due an issue with pocket), so we map over each Object in the
        // authors array if its not null.
        const authorsArray = article.authors
          ? Object.entries(article.authors)
          : null;
        const authors =
          authorsArray != null
            ? authorsArray.map(author => {
                return {
                  authorName: author[1].name,
                  authorUrl: author[1].url,
                };
              })
            : null;

        // According to google 200 words per minute is a generally accepted
        // reading speed
        const timeToRead = Math.round(article.word_count / 200);

        const imgUrl = `https://pocket-image-cache.com/direct?url=${
          article.top_image_url
        }&resize=w300-nc&f=t`;
        const articleImage =
          imgUrl.includes('url=undefined') == true
            ? '/static/placeholder.png'
            : imgUrl;

        // We return just the pieces of information we need
        return {
          articleTitle: article.resolved_title,
          articleImageUrl: articleImage,
          authors: authors,
          articleUrl: article.resolved_url,
          timeFavorited: article.time_favorited,
          wordCount: article.word_count,
          timeToRead: timeToRead,
          color: rgb,
        };
        // sort the articles by timeFavorited so the newest show on top
      })
      .sort((a, b) => {
        return b.timeFavorited - a.timeFavorited;
      });
    return { articles };
  }

  render() {
    return (
      <Layout>
        <h1>Longreads</h1>
        <div className="introText">
          <p>
            I read a lot of articles on the internet. I particularly enjoy{' '}
            <span style={{ fontWeight: 500 }}>longreads</span>, or{' '}
            <span style={{ fontWeight: 500 }}>longform journalism</span>.
            According to wikipedia, we're talking about "longer articles with
            larger amounts of content" - between 1,000 and 20,000 words.
            According to me, we're talking about any story I find interesting
            that's on the internet.
          </p>{' '}
          <p>
            I used <a href="https://getpocket.com/">Pocket</a> to hold on to and
            read articles. The ones listed below are those I've "favorited"
            through the app with the most recently read at the beginning.
          </p>
        </div>
        <div className="background">
          <div className="containerStyle">
            {this.props.articles.map(article => {
              return (
                <ArticleCard article={article} key={article.articleTitle} />
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}
