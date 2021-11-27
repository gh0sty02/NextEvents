import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { NotificationContext } from "../../store/notification-context";

interface IProps {
  eventId: string | string[] | undefined;
}

function Comments({ eventId }: IProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] =
    useState<[{ _id: string; text: string; name: string }]>();
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch("/api/comments/" + eventId)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    id: string;
    text: string;
    name: string;
  }) {
    // send data to API
    notificationCtx?.showNotification({
      title: "Adding...",
      message: "Adding Comment to the Event",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong");
          });
        }
      })
      .then((data) => {
        notificationCtx?.showNotification({
          title: "Success",
          message: "Successfully Added the Comment",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx?.showNotification({
          title: "Error",
          message: err.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetchingComments && <p>Loading..</p>}
      {showComments && !isFetchingComments && comments && (
        <CommentList items={comments} />
      )}
    </section>
  );
}

export default Comments;
