import React from 'react'
import {Link} from "react-router-dom";
import {useFetchListNews} from "../hooks";


const ListItem = ({item}) => {
    return (
        <li>
            <Link to={`/story/${item.id}`}>
                <h3>{item.title}</h3>
            </Link>
            <p>{item.by} | {item.score} points | {item.kids && `${item.kids.length} comments`}</p>
        </li>
    )
}

export const ListNews = () => {

    const {isLoading, topStories} = useFetchListNews();
    return (
        <div>
            <h1>Hacker News</h1>
            <ul>
                {
                    isLoading
                        ? 'Loading...'
                        : (topStories.map(item => <ListItem key={item.id} item={item}/>))
                }
            </ul>
        </div>
    )
}
