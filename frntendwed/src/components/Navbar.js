import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Password from "./Password";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="#home">Home</NavbarBrand>
        <NavbarToggler aria-controls="basic-navbar-nav" onClick={toggle} />
        <Collapse id="basic-navbar-nav" isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink as={Link} to="/contact">
                Contact
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink as={Link} to="/about">
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Menu
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem as={Link} to="/team">
                  Our Team
                </DropdownItem>
                <DropdownItem as={Link} to="/support">
                  Supports
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem as={Link} to="/donation">
                  Donation
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="#login" onClick={toggleModal}>
                Log In
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Log In</ModalHeader>
        <ModalBody>
          <Input placeholder="username" />
          <Password />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={toggleModal}>
            Go to Admin Panel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Example;
