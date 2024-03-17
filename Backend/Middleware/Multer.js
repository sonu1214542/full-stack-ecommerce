import multer from "multer";
import {v4 as uuid} from "uuid";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/') // The directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      const id =uuid();
      const extName= file.originalname.split(".").pop();
      cb(null, `${id}.${extName}`) 
    }
  });
  
  // Initialize multer with the storage configuration
  export const singleUpload = multer({ storage: storage }).single("photo");
  
 
