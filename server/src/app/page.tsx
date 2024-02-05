import Tabuleiro from "@/components/Tabuleiro";
import { Button, Col, Container, Row } from "react-bootstrap";

function DefaultExample() {
  return (
    <Container>
      <Row className="justify-content-center d-flex pt-5 flex-lg-row-reverse ">
        <Col xs={12} lg={6} className=" justify-content-center d-flex mb-4" >
          <Tabuleiro dimensao={8} />
        </Col>
        <Col xs={12} lg={6}>
          <div className="d-flex h-100 justify-content-center flex-lg-column  align-items-lg-center  gap-4 ">
            <Button variant="success" className="py-2 px-3 shadow" >
              <b>JOGAR</b> <br /> <small>Procurar partida</small>
            </Button>
            <div>
              <h2>Jogue Damas online</h2>
              <p>Jogue com pessoas aleatorias da Internet</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DefaultExample;
