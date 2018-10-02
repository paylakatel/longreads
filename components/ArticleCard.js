import React from 'react';
import { format } from 'date-fns';

export default function ArticleCard(props) {
  return (
    <a
      className="articleCard"
      href={props.article.articleUrl}
      target="_blank"
      key={props.article.articleTitle}
    >
      <div
        className="articleImage"
        style={{ backgroundImage: `url(${props.article.articleImageUrl})` }}
      >
        <div className="articleContent">
          <h2>{props.article.articleTitle}</h2>
          <div className="authors">
            {props.article.authors != null
              ? props.article.authors.map(author => {
                  // We put all author names to lower case here then use css to capitalize them
                  return (
                    <p key={author.authorName}>
                      {author.authorName.toLowerCase()}
                    </p>
                  );
                })
              : null}
          </div>
          <hr />
          <p>
            {props.article.wordCount} words · {props.article.timeToRead} min
          </p>
          <p>
            {format(new Date(props.article.timeFavorited * 1000), 'MM-DD-YYYY')}
          </p>
          {/* TODO: add article excerpt 
          <p> {props.article.excerpt}</p> */}
        </div>
      </div>
    </a>
  );
}
