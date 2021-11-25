import classes from "./comment-list.module.css";

function CommentList({
  items,
}: {
  items: [{ _id: string; text: string; name: string }];
}) {
  return (
    <ul className={classes.comments}>
      {items &&
        items.map((c) => (
          <li key={c._id}>
            <p>{c.text}</p>
            <div>
              By <address>{c.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
