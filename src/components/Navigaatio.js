import React from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function Navigaatio() {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Kyselypalvelu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Etusivu</Nav.Link>
                        <Nav.Link href="/Statistiikka">Statistiikka</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
