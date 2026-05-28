import serverless from 'serverless-http'
import app from '../server/app.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = serverless(app)

export default async function vercelHandler(req, res) {
  return handler(req, res)
}
