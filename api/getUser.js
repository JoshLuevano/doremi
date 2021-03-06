/* eslint-disable no-console */
import { ServerResponse, IncomingMessage } from 'http'
import User from '../db/model/user'
import { getQueryParam } from './utils'

module.exports = async function (req = new IncomingMessage(), res = new ServerResponse(), next) {
  console.info('Starting getUser request...')
  const result = { count: 0, results: [] }
  const userName = getQueryParam(req.url, 'username')

  if (userName !== '') {
    if (process.env.MODE !== 'offline') {
      result.results = await User.find({ name: userName }, '_id name avatar color')
    } else {
      // Always return empty object to fake the video download
      const fakeRequest = new Promise(resolve => setTimeout(resolve([]), 2500))
      result.results = await fakeRequest
    }
    console.log('MongoResult: ', result.results)
    result.count = result.results.length
  } else {
    console.log('username parameter was empty, returning empty value')
  }

  console.log('getUser result: ', result)

  res.statusCode = 200
  res.statusMessage = 'success'
  res.end(JSON.stringify(result))
}
