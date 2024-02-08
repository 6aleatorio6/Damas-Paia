"use client";
import SignHead from "@/components/signTop";
import { Button, Form } from "react-bootstrap";

export default function signIn() {
  return (
    <>
      <SignHead text="Entrando" />
      <Form className="" >
        <Form.Group  className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control type="email" placeholder=" email" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formGroupPassword">
          <Form.Label>senha</Form.Label>
          <Form.Control type="password" placeholder="senha" />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </>
  );
}
