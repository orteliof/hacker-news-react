import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useItemDetails} from "../hooks";

const CommentItem = ({comment}) => {
    return (
        <li>
            <h4>{comment.title} <small>by: {comment.by}</small></h4>
            <p dangerouslySetInnerHTML={{__html: comment.text}}/>
        </li>
    )
}


const ReadyDetails = ({story}) => {
    return <>
        <h2>{story.title} - <small>by: {story.by}</small></h2>
        <a href={story.url} target="_blank">View Full</a>

        <h4>Comments</h4>
        <ul>
            {story.comments && (story.comments.map((comment) => <CommentItem key={comment.id} comment={comment}/>))}
        </ul>
    </>
}

export const ItemDetails = () => {
    const navigate = useNavigate();
    const {itemId} = useParams();
    const {storyDetail, isLoading} = useItemDetails(itemId);
    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            {isLoading
                ? <div>Loading...</div>
                : storyDetail && <ReadyDetails story={storyDetail}/>
            }
        </div>
    )
}