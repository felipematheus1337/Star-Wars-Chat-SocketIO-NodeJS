import mongoose from "mongoose";


const autorSchema = mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String,required:true},
        color: {type: String},
        image: {type: String},

    }
)


const autores = mongoose.model("autores",autorSchema);

export default autores;