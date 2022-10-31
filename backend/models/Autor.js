import mongoose from "mongoose";


const autorSchema = mongoose.Schema(
    {
        id: {type: String},
        name: {type: String,required:true},
        color: {type: String},
        image: {type: String},
        messages:[{type: mongoose.Schema.Types.ObjectId, ref:'message'}]
    },
    {timestamps:true}
)


const autores = mongoose.model("autores",autorSchema);

export default autores;