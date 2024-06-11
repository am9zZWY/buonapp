import { MongoClient } from 'mongodb'

let client: MongoClient | null = null

export default async function(databaseName: string = 'buonapp') {
  if (client) {
    return client.db(databaseName)
  }

  const config = useRuntimeConfig()
  const { mongodbUsername, mongodbPassword } = config

  if (!mongodbUsername || !mongodbPassword) {
    console.error('MongoDB username or password not provided')
    throw new Error('MongoDB username or password not provided')
  }

  const mongoUri = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@buonapp0.i4lfmcr.mongodb.net/?retryWrites=true&w=majority&appName=Buonapp0`

  client = new MongoClient(mongoUri)

  try {
    // Connect to the MongoDB cluster
    console.log('Connecting to buonapp deployment...')
    await client.connect()

    // Ping the database
    const adminDb = client.db().admin()
    await adminDb.command({ ping: 1 })
    console.log('Pinged buonapp deployment!')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }

  return client.db(databaseName)
};
