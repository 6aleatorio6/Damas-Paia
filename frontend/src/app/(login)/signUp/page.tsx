"use client";
import SignHead from "@/components/signTop";
import { Button, Form } from "react-bootstrap";

export default function signUp() {
  return (
    <>
      <SignHead text="Se cadastrando" />
      <Form className="">
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="email">Nome </Form.Label>
          <Form.Control name="nick" type="email" placeholder=" nome de usuario" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="email">Email </Form.Label>
          <Form.Control name="email" type="email" placeholder=" email" />
        </Form.Group>
        <Form.Group className="mb-4" >
          <Form.Label htmlFor="password">senha</Form.Label>
          <Form.Control name="password" type="password" placeholder="senha" />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </>
  );
}
