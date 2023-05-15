import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import dotenv from "dotenv"

dotenv.config()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.l5kmybw.mongodb.net/?retryWrites=true&w=majority`,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"]

        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-file-${file.originalname}`
        }

        return {
            bucketname: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
})

export default multer({storage})