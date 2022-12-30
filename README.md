# projeto em typescript

fonte: curso de js do prof:

link no esplore url('C:\Users\junio\OneDrive\Área de Trabalho\___curso-baixado-para-avaliar\O-poder-do-Javascript-JStack')

## Para comecar

Crie uma pasta onde vai ficar o projeto
Abre o terminal crie uma pasta: mkdir api
Abre o vscode, digitando no proprio terminal code api

## Com o vscode aberto

Abre  o terminal e digite:
install o

```jsx
npm i -g yarn
```

para instalar o yarn.

Agora vamos iniciar nosso projeto, Digite:

```jsx
yarn init -y
```

caso nao funcione att o npm para no minimo esssa versao.

```jsx
npm install -g npm@9.2.0
```

Tenta denovo, se nao der certo da pra usar o npm no lugar do yarn sem problema.

Instalando o typescript como dependencia:

```jsx
yarn add -D typescript
```

criando o comoando de configuracao do typescript

```jsx
yarn tsc --init
```

Vamos usar o padrao mesmo, nao altere nada no arquivo gerado tsconfig.json

## Criando a pasta com o nome src

Onde vai ficar nosso projeto

Dentro crie um arquivo index.ts

Dentro deste arquivo digite:

```jsx
let texto: string;
texto = 1235;

console.log(texto);
```

vai da um erro pq node não roda TS.

No terminal digite:

```jsx
yarn tsc
```

para criar o arquivo js.

Antes de rodar vai no arquivo tsconfig, na linha 52 ou proximo ache o "outDir" que é a configuracao de onde criar a saida do js criado, e coloca como ./dist ou ./build, tanto faz, este arquivo vai ser o arquivo de distribuição para deploy.

## Pronto: vamos continuar criando nosso projeto

Vamos no package.json e cria o script para ao inves de ficar rodando yarn tsc vamos roda como yarn build
Altere o script para esse.

```jsx
"scripts": {
    "build": "tsc"
  },
```

testa.

Agora crie o arquivo .gitignore e dentro dele digite:

```jsx
node_modules
dist
```

por enquanto é só isso.

até aqui as configurações do typescript tudo ok - salvo como template na v0.0.1

## fase 3

Instalar extension no vscode

👉 EditorConfig for VS Code - EditorConfig (do ratinho)
👉 ESLint for VS Code - Microsoft

Editando o editorConfig, clica com o direito na raiz do projeto e vai no generation .editorconfig e clica nele, pronto foi criado um novo arquino na raiz com o nome .editorconfig.
clica neste arquivo e estude ele.

Este arquivo serve para definir as configuração padrão do seu projeto em questão de identação. ex. espaco de linha pulo delinas etc.

Instalsndo o eslink, digite

```jsx
npm init @eslint/config
```

Aqui temos bastante perguntas para configurar
escolha entra elas, vai aparecer uma de cada vez, use a cetas para andar entre elas.
👉 To check syntax, find problems, and enforce code style
👉 JavaScript modules (import/export)
👉 None of these
👉 Yes
👉 Node
👉 Answer questions about your style
👉 JSON
👉 Spaces
👉 Single
👉 windows
👉 Yes
👉 Yes
👉 yarn

## fase 4 - criação do express e instalação do servidor

```jsx
 yarn add express
```

Instalar sua dependencia

```jsx

  yarn add -D @types/express
```

beleza, bora para o código do servidor.

## edita o index.ts

 digite nele:

```jsx
import express from "express";
const app = express();
const port = 3001
app.listen(port, () => {
    console.log('servidor rodando no http://localhost:${port}');
});
```

Boa rode o yarn build e depois o node no dist/index. testa se o navegador rodou.

```jsx
yarn build
```

```jsx
node dist
```

## instalando o ts-node e nodemon

```jsx
yarn add -D ts-node
```

Nota: com este arquivo eu posso rodar o serve e ir testando sen tem a pasta dist, ou sejaa, posso fazer todo o meu código e só criar a pasta dist.

Como rodar:

```jsx

yarn ts-node src/index.ts
```

## instalando o nodemon

Digite:

```jsx
yarn add -D nodemon
```

Cria um novo script no packege.json para usar esses dois
Nota: qnd chamar o nodemon ele vai j=chamar o ts-node
Add essa linha no script.

```jsx

,"dev": "nodemon src/index.ts"
```

Rode o codigo:

```jsx
yarn dev
```

se tudo deu certo vai esta com o servidor rodando.

ok, salvarei aqui, como a version v0.0.2 template

Oque fizemos nesta fase? instalação do express, do ts-node e do nodemon.

## fase 5 desenvolvimento + banco de dados mongodb

Abre o docker faz ele rodar, abre um novo terminal no vscode e instala o mongodb no docker:

```jsx
    docker run --name mongo -p 27017:27017 -d mongo
```

Depois instala o mongoose:

```jsx
    yarn add mongoose
```

blz, vamos que vamos ....

### Nota: se fechar tudo ao abrir tem que startar o mongo no docker

se estiver dando erro de coneccao seque o passo acima.

Agora vamos escrever a linha de código para se conectar no mongodb, vai no index.ts e escreva as linhas a seguir.

```jsx
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017")
    .then(() =>  console.log("conectado ao mongodb"))
    .catch((e) =>  console.log(e, "algo deu errado"));
```

para o servidor e rode denovo: relembando no terminal: aperte o ctrl + C depois digite:

```jsx
yarn dev
```

Se tudo certo tem que aparecer servidor rodando no ...
e
conectado no mongodb
senao

### Nota: se fechar tudo ao abrir tem que startar o mongo no docker, fica a dica novamente

@ Se estiver dando erro de coneccao seque o passo acima.

blz... bora.

## fase 6 -criação do model

Abre o editor de banco de dados de sua preferencia.

Faca sua estrutura, conforme image-01.png

URL("./img/image-01.png");

Agora precisamos fazer a estrutura do models
cria uma pasta app/models/Category.ts -- aqui é como se fosse nosso tabela la da foto

Dentro deste arquivo digite:

```jsx
// Category
import {model, Schema} from "mongoose";

export const Category = model("Category", new Schema({
    name: {type: String, required: true},
    icon: {type: String, required: true},
}));
```

Faz a mesma coisa para Product e Order - ficando assim:

```jsx
// Product
import { model, Schema } from "mongoose";

export const Product = model("Product", new Schema({
    name: { type: String, required: true, },
    description: { type: String, required: true, },
    imagePath: { type: String, required: true, },
    prince: { type: Number, required: true, },
    ingredients: {
        type: [{
            name: { type: String, required: true, },
            icon: { type: String, required: true, },
        }], required: true,
    },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category", },
}));
```

```jsx
// Order
import { model, Schema } from "mongoose";

export const Order = model("Order", new Schema({
    table: { type: String, required: true },
    status: { type: String, enum: ["WAITING", "IN_PRODUCTION", "DONE"], default: "WAITING", },
    createdAt: { type: Date, default: Date.now, },
    products: {
        type: [{
            product: { type: Schema.Types.ObjectId, required: true, ref: "Product", },
            quantity: { type: Number, default: 1 },
        }], required: true,
    },
}));

```

Boa Coseguimos chegar ate aqui. outra fase concluida. Parabens...

## fase 7 - continua 1:25:00




















```jsx

```

```jsx

```

```jsx

```

👉
