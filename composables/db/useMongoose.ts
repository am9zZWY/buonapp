import mongoose from 'mongoose'

export default async function() {
  const config = useRuntimeConfig()
  const { mongodbUsername, mongodbPassword } = config

  if (!mongodbUsername || !mongodbPassword) {
    console.error('MongoDB username or password not provided')
  }


  const mongoUri = 'mongodb+srv://' + mongodbUsername + ':' + mongodbPassword + '@buonapp0.i4lfmcr.mongodb.net/?retryWrites=true&w=majority&appName=Buonapp0'

  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  console.log('Connecting to buonapp deployment...')
  await mongoose.connect(mongoUri)
  await mongoose.connection.db.admin().command({ ping: 1 })
  console.log('Pinged buonapp deployment!')
};
