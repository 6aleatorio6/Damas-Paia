"use client";
import { Button, Container, Nav,  Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <header>
      <Navbar  className="bg-body-tertiary  shadow-lg  " >
        <Container>
          <Navbar.Brand  href="#home">Damas Paias</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {false ? (
              <Navbar.Text>
                conta: <a href="#login">Paia cabral#0123</a>
              </Navbar.Text>
            ) : (
              <Nav>
                <Nav.Link href="/">Entrar</Nav.Link>
                <Button variant="primary" href="/">Cadastrar</Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
 