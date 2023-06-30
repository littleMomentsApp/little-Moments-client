import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5005"

function EditListPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);

  const {listId} = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    axios
    .get(`${API_URL}/api/lists/${listId}`)
    .then((response)=>{
      const oneList = response.data;
      setTitle(oneList.title);
      setDescription(oneList.description);
      setDate(oneList.date);
      setProducts(oneList.products)
    })
    .catch((error)=> console.log(error));
    
  },[listId])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {title, description, date, products }

    axios
    .put(`${API_URL}/api/lists/${listId}`,requestBody)
    .then((response) => {
      navigate(`/lists/${listId}`)
    })
  }

  const deleteList = () => {
    axios
    .delete(`${API_URL}/api/lists/${listId}`)
    .then(() =>{
      navigate("/lists")
    })
    .catch((err) => console.log(err))


  }

  return(
    <div className="EditListPage">
     <h3>Edit the List</h3>

     <form onSubmit={handleFormSubmit}>
      <label>Title:
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      
      
      <input />
      <label>Description</label>
      

      <label>Date
      <input/>
      </label>

      <label>Products:
        <ProductCard key/>
      </label>
      

     </form>


     </div>
)}

export default EditListPage;
