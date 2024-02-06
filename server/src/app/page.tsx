import ButtonJogarComo from "@/components/M_jogarComo";
import Tabuleiro from "@/components/Tabuleiro";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Home() {


  return (
    <Container className="pt-4">
      <Row>
        <Col xs={12} lg={7}>
          <Tabuleiro dimensao={8} tamanhoPx="100%" />
        </Col>
        <Col className="  d-flex flex-lg-column  justify-content-between  justify-content-lg-center  py-3 py-lg-0 align-items-lg-center " xs={12} lg={5}>
          <div>
            <h2>Jogue Damas online</h2>
            <p>Jogue com pessoas aleatorias da Internet </p>
          </div>
          <ButtonJogarComo />
        </Col>
      </Row>
   
    </Container>
  );
}
