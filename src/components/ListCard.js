import { Link } from "react-router-dom";

function ListCard({ title, description, date, _id }) {
  return (
    <div className="ListCard">
      <h3>{title}</h3>
      <h4>{date.toString().split("T")[0]}</h4>
      <p>{description}</p>
      <Link to={`/lists/${_id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
}

export default ListCard;
