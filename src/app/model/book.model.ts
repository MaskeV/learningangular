export interface BookModel{
    id?:number,
    title:String,
    author:String,
    category:String
    quantity:Number
    publisher:String,
    publicationYear:Number,
    available:Boolean,
    description?:String
}