import Autor from "../models/Autor.js"
import Message from "../models/Message.js"

class AutorController {

     static async getAllMsgs(req,res) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
         
        try {
           await Autor.find({}).then(char => {
            let starWarsCharacters = char;
            return res.status(200).json(starWarsCharacters)
           })

           
        }
        catch(e) {
            console.log(e)
            return res.status(500);
        }
    }

    static async postMessage(req,res) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        try {
        
            let messagePosted = await Autor.create(req.body);
            if(messagePosted) {
                return res.status(200).json(messagePosted);
            } else {
                return res.status(500);
            }
         
        } catch(e) {
           console.log(e)
           return res.status(500);
        }
    }



    
    }



export default AutorController;