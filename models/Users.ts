import mongoose from 'mongoose'

interface IUser {
  role : string,
  email : string,
  password : string,
  firstName : string,
  lastName : string,
  phoneNumber : string
}
interface UserDoc extends mongoose.Document {
  role : string,
  email : string,
  password : string,
  firstName : string,
  lastName : string,
  phoneNumber : string
}

interface UserModel extends mongoose.Model <UserDoc>{
  build(attr : IUser): UserDoc
}

const userSchema = new mongoose.Schema ({
  role : {type :String,required:true,default:"owner"},
  email : {type :String,required:true,unique:true,partialFilterExpression: {email: {$exists:true }},
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  password : {type :String,required:true,unique:true},
  firstName : {type :String,required:true},
  lastName : {type :String,required:true},
  phoneNumber : {type :String,required:true,unique:true}
},
  {
    timestamps:true,
    versionKey :false
  })

const User = mongoose.model<UserDoc, UserModel> ('userSchema', userSchema)

export {User}