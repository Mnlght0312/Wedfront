import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermEmpty, setSearchTermEmpty] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:8080/api/product")
      .then((res) => {
        console.log(res, "updated");
        setProducts(res.data.result);
        setFilteredProducts(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchTermEmpty(newSearchTerm === "");

    if (searchTermEmpty) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.productName
              .toLowerCase()
              .includes(newSearchTerm.toLowerCase()) ||
            product.price.toString().includes(newSearchTerm) ||
            product.InStock.toString().includes(newSearchTerm)
        )
      );
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:8080/api/product/${selectedProduct.id}`,
        selectedProduct
      )
      .then((res) => {
        if (res.data.result) {
          getData();
        }
        // setProducts(products.filter((p) => p._id !== selectedProduct._id));
        // setFilteredProducts(
        //   filteredProducts.filter((p) => p._id !== selectedProduct._id)
        // );
        setDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleSaveChanges = () => {
    axios
      .put(
        `http://localhost:8080/api/product/${selectedProduct.id}`,
        selectedProduct
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          getData();
        }

        // const updatedProducts = products.map((p) =>
        //   p._id === selectedProduct._id ? selectedProduct : p
        // );
        // setProducts(updatedProducts);
        // setFilteredProducts(updatedProducts);
        setEditModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  return (
    <>
      <Container style={{ backgroundColor: "dark" }}>
        <Form>
          <FormGroup>
            <Label for="search">Search section</Label>
            <Input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, price or in-stock status"
            />
          </FormGroup>
        </Form>
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} xs="12" sm="6" md="4">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={product.thumbImage}
                  alt="Product image"
                />
                <CardBody>
                  <CardTitle>{product.productName}</CardTitle>
                  <CardSubtitle>${product.price}</CardSubtitle>
                  <CardText>
                    In stock: {product.InStock}
                  </CardText>
                  <CardSubtitle>{product.description}</CardSubtitle>
                  <Button color="primary" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>{" "}
                  <Button color="danger" onClick={() => handleDelete(product)}>
                    Delete
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
          <ModalHeader toggle={() => setEditModal(!editModal)}>
            Edit product
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="productName">Product Name</Label>
                <Input
                  type="text"
                  name="productName"
                  id="productName"
                  value={selectedProduct.productName}
                  placeholder="Enter product name"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productName: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={selectedProduct.price}
                  placeholder="Enter price"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="InStock">In Stock</Label>
                <Input
                  type="number"
                  name="InStock"
                  id="InStock"
                  value={selectedProduct.InStock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      InStock: e.target.value,
                    })
                  }
                >
                
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={selectedProduct.description}
                  placeholder="Enter your description"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>{" "}
            <Button color="secondary" onClick={() => setEditModal(!editModal)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
          <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>
            Delete Product
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete {selectedProduct.productName}?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};
export default HomePage;
