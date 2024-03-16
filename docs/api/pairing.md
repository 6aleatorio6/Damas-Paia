# Docs de API: Pareamento

## Endpoints

Rota de gerenciamento de partida protegida

### Iniciar pareamento

Endpoint utilizado para entrar na fila de pareamento

- **URL:** `/pairing/start`
- **Método:** `PATCH`

### Cancelar pareamento

Endpoint utilizado para cadastrar um usuário e obter um token de acesso.

- **URL:** `/pairing/stop`
- **Método:** `PATCH`

## Rotinas

### rotinaDePareamento

Ela é chamada a cada 4 segundos e parea em pares os usuarios com pareamento ligado
