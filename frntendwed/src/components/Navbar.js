import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Password from "./Password";
import { Link, Outlet } from "react-router-dom";

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
        <NavbarBrand>
          <Link to="/home">Home</Link>
        </NavbarBrand>

        <NavbarToggler aria-controls="basic-navbar-nav" onClick={toggle} />
        <Collapse id="basic-navbar-nav" isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/contact">Contact</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/about">About</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/products">
                <Link to="/products">Products</Link>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Menu
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/team">Our Team</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/support">Supports</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/donation">Donation</Link>
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
            <Link to="/adminLayout">Go to the Admin panel</Link>
          </Button>
        </ModalFooter>
      </Modal>

      <Outlet />
    </div>
  );
};

export default Example;
