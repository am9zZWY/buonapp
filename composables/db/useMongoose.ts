import mongoose from 'mongoose'

interface Options {
  immediate?: boolean
}

export default async function(options: Options = {}) {
  const { immediate = true } = options

  const config = useRuntimeConfig()
  const { mongodbUsername, mongodbPassword } = config

  if (!mongodbUsername || !mongodbPassword) {
    console.error('MongoDB username or password not provided')
  }


  const mongoUri = 'mongodb+srv://' + mongodbUsername + ':' + mongodbPassword + '@buonapp0.i4lfmcr.mongodb.net/?retryWrites=true&w=majority&appName=Buonapp0'
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

  const connect = async () => {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(mongoUri, clientOptions)
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log('Pinged buonapp deployment!')
  }
  if (immediate) {
    await connect()
  }

  return {
    connect
  }
};
