import Link from "next/link";
import classes from "./button.module.css";

interface IProps {
  link?: string;
}

const Button: React.FC<IProps> = ({ link, children }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button type="submit" className={classes.btn}>
      {children}
    </button>
  );
};

export default Button;
