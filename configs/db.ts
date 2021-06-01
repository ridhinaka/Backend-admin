import mongoose from 'mongoose'

class mongoDB {
  public connectDB(): void{

    const pathURL = 'mongodb://localhost/admin'
    const connectOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false }
    mongoose.connect(pathURL, connectOption, ()=> {
    })
      
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Connection error :'))
    db.once('open', () => {
      console.log("konek bos")
    })
  }
}

export default new mongoDB().connectDB