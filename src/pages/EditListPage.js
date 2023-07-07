import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button, Row, Col, Container, Card } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function EditListPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]); // my
  const [allProducts, setAllProducts] = useState([]); // all DB
  const [addedProducts, setAddedProducts] = useState([]); // array ids my products
  // const currentDate = new Date().toISOString().split("T")[0];
  const { listId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, [listId]);
  // get details of user list
  const getList = () => {
    axios
      .get(`${baseUrl}/api/lists/${listId}`)
      .then((response) => {
        const oneList = response.data;
        setTitle(oneList.title);
        setDescription(oneList.description);
        setDate(oneList.date);
        setProducts(oneList.products); // array Obj products
        setAddedProducts([
          ...oneList.products.map((element) => {
            return element._id; // array of productIds
          }),
        ]);
      })
      .then((response) => {
        getAllProducts();
      })
      .catch((error) => console.log(error));
  };

  function handleDelete(productId, e) {
    const newProduct = products.filter((element) => element._id !== productId);
    setProducts(newProduct);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("addList", addedProducts);
    const requestBody = { title, description, date, addedProducts };
    console.log(requestBody);

    axios
      .put(`${baseUrl}/api/lists/${listId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        getList();
        navigate(`/lists/${listId}`);
      });
  };

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/api/products`)
      .then((allProducts) => {
        setAllProducts(allProducts.data);
      })
      .catch((e) => console.log(e));
  };

  const addProduct = (productId) => {
    const addingOne = allProducts.filter(
      (element) => element._id === productId
    );
    setProducts([...addingOne, ...products]);
    setAddedProducts([...addingOne, ...addedProducts]);
  };

  return (
    <div>
      <h3>Edit your List</h3>

      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
        </label>
        <label>
          Description:
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </label>
        <Button
          variant="outline-success"
          className="ms-3 mt-5 mb-3 pt-2"
          type="submit"
        >
          Update
        </Button>
        {/* <label>
          Date:
          <input
            type="date"
            name="date"
            min={currentDate}
            value={date.toString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />          
        </label> */}

        <Container>
          <Row>
            <label>
              {" "}
              <br />
              Products:
            </label>
            {/* MY PRODUCTS */}
            {products &&
              products.map((productObj, index) => (
                <Col xs={3} md={6} key={index}>
                  <ProductCard
                    {...productObj}
                    list={listId}
                    deleteProduct={handleDelete}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </form>
      <Container>
        <Row>
          {allProducts.map((productO, index) => {
            return (
              <Col xs={3} md={6} key={index}>
                <Card className="m-4" border="secondary">
                  <Card.Img variant="top" src={productO.imageURL} />
                  <Card.Body>
                    <Card.Title>{productO.title}</Card.Title>
                    <Card.Text>{productO.description}</Card.Text>
                    <Card.Text>
                      {" "}
                      <b>Quantity:</b> {productO.quantity}
                    </Card.Text>
                    <Card.Text>{productO.category}</Card.Text>
                    <Card.Text>
                      <b>Price:</b> {productO.price}${" "}
                    </Card.Text>
                    <Button
                      variant="outline-success"
                      onClick={(e) => {
                        return addProduct(productO._id, e);
                      }}
                    >
                      Add to List
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
export default EditListPage;
