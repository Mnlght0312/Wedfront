import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product")
      .then((res) => {
        setProducts(res.data.result);
        setFilteredProducts(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredProducts(
      products.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.price.toString().includes(searchTerm) ||
          product.InStock.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <Container style={{ backgroundColor: "dark" }}>
      <Form>
        <FormGroup>
          <Label for="search">Search section</Label>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button style={{ backgroundColor: "green" }}>Search</Button>
        </FormGroup>
      </Form>
      <Row>
        {filteredProducts.map((product) => (
          <Col xs="4">
            <Card style={{ backgroundColor: "gray" }}>
              <CardImg src={product.thumbImage} />
              <CardBody>
                <CardTitle> Name : {product.productName}</CardTitle>
                <CardSubtitle>{product.price}$</CardSubtitle>
                <CardText>In stock: {product.InStock}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
