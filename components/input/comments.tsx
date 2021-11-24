import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

interface IProps {
  eventId: string | string[] | undefined;
}

function Comments({ eventId }: IProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] =
    useState<[{ id: string; text: string; name: string }]>();

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComments(data.comments);
        });
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    id: string;
    text: string;
    name: string;
  }) {
    // send data to API
    console.log(`/api/comments/${eventId}`);
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && comments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
