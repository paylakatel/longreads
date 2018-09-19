import React from 'react'
import { format } from 'date-fns'

export default function ArticleCard(props) {
    
    return (
        <div className="articleImage" style={{backgroundImage: `url(${props.article.articleImageUrl})`}}>
            <div className="articleContent">  
                <h2>{props.article.articleTitle}</h2>
                {props.article.authors != null ? props.article.authors.map(author => {
                    // We put all author names to lower case here then use css to capitalize them
                    return <p className="authors">{author.authorName.toLowerCase()}</p>
                }) : null}
                <p>{props.article.wordCount} words · {props.article.timeToRead} min</p>
                <p>{format(new Date(props.article.timeFavorited*1000), 'MM-DD-YYYY')}</p>
            </div>
        </div>
    )
}