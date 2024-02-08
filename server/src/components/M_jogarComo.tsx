"use client";
import { useState } from "react";
import { Button, Modal, ModalProps } from "react-bootstrap";

function ModalJogarComo(props: ModalProps) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter ">
          Iniciar Partida Como
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="success" className="w-100 mb-3 py-3">Jogar como convidado</Button>
        <Button href="/signIn"  className="w-100 mb-3 py-3">
          Entrar na sua conta
        </Button>
        <Button href="/signUp" className="w-100  py-3">
          Criar uma conta
        </Button>
      </Modal.Body>
      
    </Modal>
  );
}

export default function ButtonJogarComo() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => setShow(true)}
        variant="success"
        className="py-2 px-3 shadow "
      >
        <b>JOGAR</b> <br /> <small>Procurar partida</small>
      </Button>
      <ModalJogarComo show={show} onHide={() => setShow(false)} />
    </>
  );
}
