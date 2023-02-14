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
            product.inStock
              .toString()
              .toLowerCase()
              .includes(newSearchTerm.toLowerCase())
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
      .delete(`http://localhost:8080/api/product/${selectedProduct._id}`)
      .then((res) => {
        setProducts(products.filter((p) => p._id !== selectedProduct._id));
        setFilteredProducts(
          filteredProducts.filter((p) => p._id !== selectedProduct._id)
        );
        setDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSaveChanges = () => {
    axios
      .put(
        `http://localhost:8080/api/product/${selectedProduct._id}`,
        selectedProduct
      )
      .then((res) => {
        const updatedProducts = products.map((p) =>
          p._id === selectedProduct._id ? selectedProduct : p
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
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
                  src={product.imageURL}
                  alt={product.productName}
                />
                <CardBody>
                  <CardTitle tag="h5">{product.productName}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    ${product.price}
                  </CardSubtitle>
                  <CardText>{product.description}</CardText>
                  <Button color="primary" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(product)}>
                    Delete
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
        <ModalHeader toggle={() => setEditModal(!editModal)}>
          Edit Product
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
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    productName: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
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
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  checked={selectedProduct.inStock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      inStock: e.target.checked,
                    })
                  }
                />
                In Stock
              </Label>
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
    </>
  );
};
