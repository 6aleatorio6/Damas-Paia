import { Container, Row, Col, Image } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark-subtle mt-3 ">
      <div
        style={{
          backgroundColor: "#8358ae",
          padding: "2px 15px 5px 0",
        }}
      >
        <Container className=" d-flex flex-row-reverse ">
          <a href="https://github.com/6aleatorio6/Damas-Paia">
            <Image
              src="/imgs/github-mark-white.svg"
              width={20}
              height={20}
              alt="github icon"
            />
          </a>
        </Container>
      </div>
      <Container>
        <Row className="text-center">
          <p className=" my-2">
            &copy; 2024 DamasPaias. Todos os direitos reservados.
          </p>
        </Row>
      </Container>
    </footer>
  );
}
