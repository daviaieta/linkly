# 🔗 Linkly API

API REST para encurtamento de URLs, construída com **Node.js**, **Fastify**, **Prisma 7** e **SQLite**.

---

## ✨ Funcionalidades

- ✅ Criar URL encurtada (`POST /urls`)
- ✅ Redirecionar pelo código curto (`GET /:code`)
- ✅ Contabilizar acessos (cliques incrementados a cada redirect)
- ✅ Consultar estatísticas (`GET /urls/:code/stats`)
- ✅ Listar URLs cadastradas (`GET /urls`)

## 🚧 Em aberto

- Validação de entrada com JSON Schema
- Error handler global

---

## 🛠️ Stack

- **Node.js 22+** (ESM)
- **TypeScript** (strict)
- **Fastify 5**
- **Prisma 7** com driver adapter `better-sqlite3`
- **nanoid** (geração dos códigos curtos de 6 caracteres)
- **SQLite** (arquivo local em `prisma/dev.db`)

---

## 📂 Estrutura

```
linkly/
├── src/
│   ├── server.ts              # bootstrap do Fastify + dotenv
│   ├── routes/                # registro de rotas
│   ├── controllers/           # handlers HTTP
│   ├── services/              # regras de negócio
│   ├── repositories/          # acesso ao Prisma
│   └── lib/                   # cliente Prisma
├── prisma/
│   ├── schema.prisma          # model Url
│   └── migrations/            # migrações versionadas
├── .env                       # DATABASE_URL (não versionado)
├── .env.example               # template versionado
└── package.json
```

Camadas: **route → controller → service → repository → Prisma**. Cada camada só conhece a imediatamente abaixo.

---

## ⚙️ Setup

```bash
# 1. Instalar dependências
npm install

# 2. Criar o .env a partir do exemplo
cp .env.example .env

# 3. Rodar a migration (cria prisma/dev.db e a tabela urls)
npx prisma migrate dev

# 4. Subir o servidor em modo watch
npm run dev
```

O servidor sobe em `http://localhost:3333`.

### Scripts disponíveis

| Script              | O que faz                                     |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Sobe o servidor com `tsx watch` (reload auto) |
| `npm run start`     | Sobe o servidor (sem watch)                   |
| `npm run typecheck` | `tsc --noEmit`                                |
| `npm run test`      | Roda a suíte de testes com `node:test`        |
| `npm run db:migrate`| Aplica/cria migrations                        |
| `npm run db:studio` | Abre o Prisma Studio                          |
| `npm run db:generate` | Regenera o client do Prisma                 |

---

## 📡 Endpoints

Base URL: `http://localhost:3333`

### `POST /urls`

Cria uma URL encurtada.

**Request**
```json
{
  "originalUrl": "https://www.example.com/artigo-muito-longo"
}
```

**Response — `201 Created`**
```json
{
  "shortCode": "aB3xY9",
  "shortUrl": "http://localhost:3333/aB3xY9",
  "originalUrl": "https://www.example.com/artigo-muito-longo",
  "createdAt": "2026-07-04T15:30:00.000Z"
}
```

### `GET /:code`

Redireciona para a URL original. Incrementa o contador de cliques.

**Response — `302 Found`** (header `Location` aponta para a URL original)

**Response — `404 Not Found`** quando o código não existe:
```json
{ "message": "URL not found" }
```

### `GET /urls/:code/stats`

Retorna estatísticas de uma URL.

**Response — `200 OK`**
```json
{
  "shortCode": "aB3xY9",
  "originalUrl": "https://www.example.com/artigo-muito-longo",
  "clicks": 12,
  "createdAt": "2026-07-04T15:30:00.000Z"
}
```

**Response — `404 Not Found`** quando o código não existe.

### `GET /urls`

Lista todas as URLs cadastradas (debug).

**Response — `200 OK`**
```json
[
  {
    "id": 1,
    "shortCode": "aB3xY9",
    "originalUrl": "https://www.example.com/artigo-muito-longo",
    "clicks": 12,
    "createdAt": "2026-07-04T15:30:00.000Z"
  }
]
```

---

## 🧪 Exemplos com cURL

```bash
# Criar
curl -X POST http://localhost:3333/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.example.com/muito-longo"}'

# Redirecionar (não use -L se quiser ver o 302)
curl -i http://localhost:3333/aB3xY9

# Stats
curl http://localhost:3333/urls/aB3xY9/stats

# Listar tudo
curl http://localhost:3333/urls
```

---

## 🗃️ Modelo de dados

```prisma
model Url {
  id          Int      @id @default(autoincrement())
  shortCode   String   @unique
  originalUrl String
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())

  @@map("urls")
}
```

---

## 🔐 Variáveis de ambiente

Crie um `.env` (copiando de `.env.example`):

```env
DATABASE_URL="file:./dev.db"
```

---

## 📄 Licença

Projeto de estudo. Sem licença formal.
