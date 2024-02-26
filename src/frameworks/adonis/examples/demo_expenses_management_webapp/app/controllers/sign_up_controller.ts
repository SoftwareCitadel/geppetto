import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SignUpController {
  async store({ request, auth, response }: HttpContext) {
    const { fullName, email, password } = request.all()
    if (await User.findBy('email', email)) {
      return response.conflict('Email already in use')
    }

    const user = await User.create({ email, password, fullName })

    await auth.use('web').login(user)
    return response.redirect('/')
  }
}
