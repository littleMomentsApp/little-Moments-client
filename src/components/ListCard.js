import { Link } from "react-router-dom";

function ListCard({ title, description, date, _id }) {
  return (
    <div className="ListCard">
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>{date}</h4>
      <Link to={`/lists/${_id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
}

export default ListCard;
