# Docs de API: Pareamento

## Endpoints

Rota de gerenciamento de partida protegida

### Iniciar pareamento

Endpoint utilizado para entrar na fila de pareamento

- **URL:** `/match/start`
- **Método:** `PATCH`

### Cancelar pareamento

Endpoint utilizado para sair da fila de pareamento

- **URL:** `/match/stop`
- **Método:** `PATCH`

### desistir da partida

Endpoint utilizado para terminar a partida em andamento como perdedor

- **URL:** `/match/surrender`
- **Método:** `PATCH`

## Rotinas

### rotinaDePareamento

Ela é chamada a cada 4 segundos e parea os usuarios com pareamento ligado em pares
