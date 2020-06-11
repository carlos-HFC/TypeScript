import { Request, Response } from 'express'

import EmailService from '../services/EmailService'

const user = [
   { name: "Carlos", email: "carlos@email.com" },
   { name: "Carlos", email: "carlos@email.com" },
   { name: "Carlos", email: "carlos@email.com" },
   { name: "Carlos", email: "carlos@email.com" },
   { name: "Carlos", email: "carlos@email.com" },
   { name: "Carlos", email: "carlos@email.com" },
   { name: "Carlos", email: "carlos@email.com" },
]

export default {
   async index(req: Request, res: Response) {
      return res.json(user)
   },

   async create(req: Request, res: Response) {
      const emailService = new EmailService()

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