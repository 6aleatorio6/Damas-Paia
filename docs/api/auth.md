# Docs de API: Autenticação

## Endpoints

Antes de acessar os endpoints protegidos, é necessário autenticar-se através do endpoint de login.

### Login

Endpoint utilizado para autenticar um usuário e obter um token de acesso.

- **URL:** `/auth/login`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
	"nome": "leo123",
	"senha": "leo123"
  }
### Cadastro

Endpoint utilizado para cadastrar um usuário e obter um token de acesso.

- **URL:** `/auth/signup`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
	"nomeDeUsuario": "leo123",
	"senha": "1233"
  }
  
### Cadastrar como guest

Endpoint utilizado para cadastrar um usuário com nome e senha aleatorio e obter um token de acesso.

- **URL:** `/auth/guest`
- **Método:** `POST`
- **Corpo da Requisição:** `sem body`


