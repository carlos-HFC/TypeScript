# Iniciando em TypeScript

O TypeScript é uma ferramente que adiciona tipagem estática ao JS que por padrão é uma linguagem que possui tipagem dinâmica. O TypeScript só pode ser utilizado em ambiente de desenvolvimento e é convertido para JavaScript no build de produção.<br>

Uma das vantagens de utilizá-lo é a possibilidade de descobrir erros durante o desenvolvimento e incrementar a *IntelliSense* que estamos utilizando.

## Instalando o TypeScript

Há duas formas de instalar o TypeScript
- Via *npm* (ou *yarn*)
- Instalando plugins do VS Code

```js
npm install -g typescript
//ou
yarn add typescript
```

## Criando o primeiro projeto

Todos os projetos em TypeScript, diferente do JavaScript, recebem a extensão `.ts`.

```ts
function person(name) {
   console.log(`Hello ${name}`)
}
person("Carlos")
```

No exemplo acima, a função `person` recebia um parâmetro chamado `name`. Ao chamar essa função, o parâmetro passado foi uma variável que recebia uma string, formando assim em seu console.log `"Hello Carlos"`.

## Compilando o código

Para que possamos utilizar o TypeScript, precisaríamos compilar o arquivo. Poderiamos, simplesmente, copiar/colar o código TS em um arquivo JS, porém, não é recomendando, visto que há a possibilidade de termos muitos arquivos no projeto para conversão. Para isso, podemos compilar pelo terminal da seguinte forma:

`tsc person.ts`

O resultado será um arquivo `person.js` que contém o mesmo código escrito do arquivo `person.ts`.

## Definindo o tipo

A definição de tipos é uma forma de registrar o que é esperado pela função ou variável. Nesse caso, esperamos que a função seja chamado com um parâmetro do tipo `string`. Podemos, ao passar o parâmetro, alterar o seu tipo, mas o TypeScript interpreta que não é uma string e retornará um erro.

```ts
function person(name: string) {
   console.log(`Hello ${name}`)
}
person("Carlos")
```

```ts
// passando outro tipo de variável
function person(name: string) {
   console.log(`Hello ${name}`)
}
person([1, 2, 3])
```
`Argument of type 'number[]' is not assignable to parameter of type 'string'.`

Da mesma forma se remover os argumentos da chamada. O TypeScript informará que chamou essa função com um número inesperado de parâmetros.<br>

Mesmo que haja erros, o arquivo foi compilado. Podemos utilizar o TypeScript mesmo se houver erros no código, entretanto, ele avisou que o código provavelmente não será executado conforme o esperado.<br>

Também devemos tomar cuidado com a inferência de tipos. Um exemplo disso é o *express*, muito utilizado para criação de APIs. Quando criamos uma rota com o express, fazemos da seguinte forma:

```ts
import express from 'express'

const app = express()

app.get('/', (req, res) => {
   return res.send("Hello World")
})

app.listen(3333)
```

No exemplo acima, estamos importando o express e adicionado uma rota do tipo GET que retornará um `"Hello World"`. Neste caso, o método GET recebe dois parâmetros: a sua rota ("/") e uma função. A questão é que a função recebe dois parâmetros: `req` e `res`, mas não foi definido uma tipagem a elas. Isso ocorre por estarmos importando o próprio express neste arquivo.<br>

Por costume, criamos uma pasta onde estarão os controllers da aplicação, e colocamos todas as funções nessa pasta e importamos para um arquivo de rotas. Porém, neste caso, o express não é importado e os parâmetros `req` e `res` estarão sem sua tipagem, fazendo com que o TypeScript mostre que não há tipagem e, assim, não terá como identificar se o código passado para determinada função terá o retorno esperado.

```ts
const user = [
   { name: "Carlos", email: "carlos@email.com" }
]

export default {
   async index(req, res) {
      return res.json(user)
   }
}
```

Para isso, podemos importar a definição de tipos para o `req` e o `res` com:

`import { Request, Response } from 'express'`

E, ao passar os parâmetros para a função:

```ts
import { Request, Response } from 'express'

const user = [
   { name: "Carlos", email: "carlos@email.com" }
]

export default {
   async index(req: Request, res: Response) {
      return res.json(user)
   }
}
```


### Tipagem simples

Para tipar as variáveis, podemos simplesmente adicionar o tipo dela após sua declaração.

```ts
const x: number = 3
const arr: number[] = [1, 2, 3]
```

Para tipar os parâmetros de uma função, informamos logo após a sua declaração e para a função, logo após fechar os parênteses dos parâmetros. Também é possível tipar o retorno de uma função. No exemplo abaixo, definimos que o retorno da função é uma string.

```ts
function compare (a: number, b: number): string {
   return a > b ? 'A é maior que B' : 'A é menor que B'
}
```

## Interfaces

A *interface* descreve um objeto que receberá diversas propriedades. Podemos reutilizá-lo em todo o projeto. No TypeScript, dois tipos são compatíveis se a estrutura interna for compatível. Isso permite implementar uma interface apenas com o formato que ela exige.

```ts
interface IPerson {
   firstName: string
   lastName: string
}
function person(name: IPerson) {
   console.log(`Hello ${name.firstName} ${name.lastName}`)
}
person({ firstName: "Carlos", lastName: "Faustino" })
```

Também podemos desestruturar uma interface ao passá-la para função.

```ts
interface IPerson {
   firstName: string
   lastName: string
}
function person({ firstName, lastName }: IPerson) {
   console.log(`Hello ${firstName} ${lastName}`)
}
person("Carlos", "Faustino")
```

Para definir que algum campo não seja obrigatório, podemos passar a interface o ponto de interrogação (?) da seguinte forma:

```ts
interface IPerson {
   firstName: string
   lastName?: string
}
```

Caso uma função receba parâmetros e ao chamá-la não for passado os argumentos a ela, o TypeScript retornará o erro dizendo o número de argumentos esperados e o número de argumentos passados

```ts
//EmailService
interface IMailTo {
   name: string
   email: string
}

interface IMessage {
   subject: string
   body: string
}

class EmailService() {
   sendMail(to: IMailTo, message: IMessage) {
      console.log(`E-mail enviado para ${to.name}`)
   }
}

export default EmailService

//Controller
import { Request, Response } from 'express'
import Email from './services/EmailService'

export default {
   async create(req: Request, res: Response) {
      const email = new Email()

      emailService.sendMail({
         name: "Carlos", email: "carlos@email.com"
      }, {
         subject: "Assunto", body: "Corpo da mensagem"
      })

      return res.send()
   }
}
```

O método `sendMail()` espera dois parâmetros : `to` e `message`, porém, nenhum deles foi passado na chamada da função. Para saber quais são os parâmetros, basta passar o mouse em cima da função que ele te mostrará quais são estes parâmetros e o tipo que recebem.<br>

Para nomear os parâmetros da função, basta passar um objeto ao invés de passar vários parâmetros. Logo, nosso arquivo `EmailService` ficará da seguinte forma:

```ts
interface IMailTo {
   name: string
   email: string
}

interface IMessage {
   subject: string
   body: string
}

interface IMessageDTO {
   to: IMailTo
   message: IMessage
}

class EmailService() {
   sendMail({ to, message }: IMessageDTO) {
      console.log(`E-mail enviado para ${to.name}`)
   }
}
```

E no `UserController`:

```ts
import { Request, Response } from 'express'
import Email from './services/EmailService'

export default {
   async create(req: Request, res: Response) {
      const email = new Email()

      emailService.sendMail({
         to: { 
            name: "Carlos", 
            email: "carlos@email.com"
         },
         message: {
            subject: "Assunto",
            body: "Corpo da mensagem"
         }
      })

      return res.send()
   }
}
```

Uma boa prática para as interfaces é nomeá-las com a letra *I* a frente: `IMailTo`.

## React.FC

No React, quando passamos *props* em um componente funcional, precisamos declarar uma interface para ele. O problema é que, ao declarar um interface e passá-la ao componente, estaríamos retirando uma propriedade importante que o componente recebe, o *children*.<br>

```tsx
import React from 'react'

interface IUser {
   user: {
      name: string
      email: string
   }
}

const User = ({ user }: IUser) => {
   return (
      <div>
         <p>Meu nome é {user.name}</p>
         <p>Meu e-mail é {user.email}</p>
      </div>
   )
}

export default User
```

Neste caso acima, o componente recebe uma propriedade: **user**. Ela foi passada ao componente através da interface *IUser*. Porém, quando chamarmos esse componente em outro arquivo .jsx, não poderemos passar um children para ele, pois sua interface não recebe essa propriedade. Como contornar este problema?<br>

Podemos utilizar uma tipagem do React chamada *React.FC*. Ela recebe um parâmetro que são as props e, neste caso, podemos passar a interface para ele.

```tsx
import React from 'react'

interface IUser {
   user: {
      name: string
      email: string
   }
}

const User: React.FC<IUser> = ({ user, children }) => {
   return (
      <div>
         <p>Meu nome é {user.name}</p>
         <p>Meu e-mail é {user.email}</p>

         <div>
            {children}
         </div>
      </div>
   )
}
```

Agora, com o *React.FC* teremos acesso a tipagem da interface *IUser*, além de, na chamada do componente, passarmos um children a ele.

## Types

Quando uma variável pode assumir formatos distintos mesmo que pertencendo a uma mesma entidade, podemos utilizar os Types. Eles são diferentes das interface por alguns pontos, não podem herdar outras interface e podem assumir formatos distintos.

```ts
type Poligono = 
   { type: 'quadrado', x: number } |
   { type: 'circulo', radius: number } |
   { type: 'retangulo', x: number, y: number }

export function area (poligono: Poligono): number {
   switch (poligono.type) {
      case 'quadrado': 
         return poligono.x ** 2
      case 'circulo': 
         return Math.PI * poligono.radius **2
      case 'retangulo': 
         return poligono.x * poligono.y
   }
}
```

No exemplo acima, o parâmetro pode assumir três formatos baseado no tipo de figura.

## Enum

O Enum é uma forma de definirmos constates na tipagem a fim de reaproveitarmos código entre funções e/ou arquivos.

```ts
enum TPoligono { Quadrado, Circulo, Retangulo }

type Poligono = 
   { type: TPoligono.Quadrado, x: number } |
   { type: TPoligono.Circulo, radius: number } |
   { type: TPoligono.Retangulo, x: number, y: number }

export function area (poligono: Poligono): number {
   switch (poligono.type) {
      case TPoligono.Quadrado: 
         return poligono.x ** 2
      case TPoligono.Circulo: 
         return Math.PI * poligono.radius ** 2
      case TPoligono.Retangulo: 
         return poligono.x * poligono.y
   }
}
```

Podemos ver que foi definido via Enum as possibilidades de tipos de polígonos e reaproveitamos essa tipagem no corpo do switch/case.