import { type S3Event } from 'aws-lambda'

export const handler = async (event: S3Event): Promise<any> => {
  console.log('Event: ', JSON.stringify(event, null, 2))
  return {
    statusCode: 200,
    body: JSON.stringify(event)
  }
}
