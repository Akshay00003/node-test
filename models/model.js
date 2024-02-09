import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    title:String,
    author:String,
    year:Number
})
const bookModel=mongoose.model('list',bookSchema)
export default bookModel