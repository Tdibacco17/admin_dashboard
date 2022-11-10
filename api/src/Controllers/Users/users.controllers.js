import { encrypt, compare } from "../../config/Helpers/HashPass/handleBCrypt.js"
import { regexId, regexPassword, regexEmail, regexFullText } from "../../config/Helpers/Regex/regex.js"
import { updateUser } from "../../config/Helpers/Query/Users/usersQuerys.js"
import { getUserId } from "../../config/Helpers/Query/Admin/adminQuerys.js"

export const updateUserController = async (req, res) => {
   //cambiar la logica en caso de querer sacarle los returns al codigo
   const { id } = req.query
   const { name, last_name, email, password } = req.body

   try {
      const user = req.body
      if (!name && !last_name && !email && !password) {
         return res.json({
            msg: "No se enviaron datos",
            success: false,
            ErrorCode: 9
         })
      }

      if (regexId(id)) {
         if (password) {
            // if (regexPassword(password)) {
            // const passwordHash = await encrypt(password);
            user.password = password
            // } else {
            //    return res.json({
            //       msg: "Contraseña invalido",
            //       success: false,
            //       ErrorCode: 2
            //    })
            // }
         }
         if (email) {
            if (regexEmail(email)) {
               user.email = email;
            } else {
               return res.json({
                  msg: "Email invalido",
                  success: false,
                  ErrorCode: 4
               })
            }
         }
         if (name) {
            if (regexFullText(name)) {
               user.name = name.toUpperCase()
            } else {
               return res.json({
                  msg: "Nombre invalido",
                  success: false,
                  ErrorCode: 2
               })
            }
         }
         if (last_name) {
            if (regexFullText(last_name)) {
               user.last_name = last_name.toUpperCase()
            } else {
               return res.json({
                  msg: "Last Name invalido",
                  success: false,
                  ErrorCode: 6
               })
            }
         }
         updateUser(user, id, res)
      } else {
         res.json({
            msg: "Id invalido",
            success: false,
            ErrorCode: 1
         })
      }
   } catch (e) {
      console.log(e.message)
      res.json({
         msg: "Entro al catch",
         success: false,
         ErrorCode: 111
      })
   }
}

export const updateTokenVerifyController = async (req, res) => {
   const { id } = req.body

   //si ejecuta el update el id existe   
   try {
      if (regexId(id)) {
         getUserId(id, res)
      } else {
         res.json({
            msg: "Id invalido",
            success: false,
            ErrorCode: 1
         })
      }
   } catch (e) {
      console.log(e.message)
      res.json({
         msg: "Entro al catch",
         success: false,
         ErrorCode: 111
      })
   }
}
