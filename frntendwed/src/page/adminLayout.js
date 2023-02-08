import React from "react";
import { Nav, NavItem, NavLink, Container, Row, Col } from "reactstrap";

const SideBar = () => {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container style={{ backgroundColor: "#212529", color: "#fff" }}>
      <Row>
        <Col sm="3">
          <Nav vertical pills>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                active={activeTab === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                active={activeTab === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                Menu
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                active={activeTab === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                Buttons
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                active={activeTab === "4"}
                onClick={() => {
                  toggle("4");
                }}
              >
                Chart
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#fff" }}
                active={activeTab === "5"}
                onClick={() => {
                  toggle("5");
                }}
              >
                Forms
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;
