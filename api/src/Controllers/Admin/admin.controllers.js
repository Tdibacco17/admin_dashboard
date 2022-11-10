import { regexId, regexFullText, regexEmail } from "../../config/Helpers/Regex/regex.js"
import {
   deletUserId, getUserId, getAllUsers, deleteEmailId, getEmailId, getAllEmails,
   searchbarUserDouble, searchbarUserSingleName, searchbarUserSingleLast_Name,
   searchbarEmailDouble, searchbarEmailSingleFull_Name, searchbarEmailSingleEmail
} from "../../config/Helpers/Query/Admin/adminQuerys.js";

export const deleteUserController = (req, res) => {
   const { id } = req.query

   try {
      if (regexId(id)) {
         deletUserId(id, res)
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
         ErrorCode:  1113
      })
   }
}

export const getUserController = (req, res) => {
   const { id } = req.body

   try {
      if (regexId(id)) {
         getUserId(id, res)
      } else {
         getAllUsers(res)
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

export const deleteEmailController = (req, res) => {
   const { id } = req.query

   try {
      if (regexId(id)) {
         deleteEmailId(id, res)
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

export const getEmailsControllers = (req, res) => {
   const { id } = req.body

   try {
      if (regexId(id)) {
         getEmailId(id, res)
      } else {
         getAllEmails(res)
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

//searchbar
export const searchbarUserController = (req, res) => {
   const { name, last_name } = req.body

   try {
      if (name && last_name) {
         if (regexFullText(name) && regexFullText(last_name)) {
            searchbarUserDouble(name, last_name, res)
         } else {
            res.json({
               msg: "Dato de busqueda invalido",
               success: false,
               ErrorCode: 1
            })
         }
      } else if (name) {
         if (regexFullText(name)) {
            searchbarUserSingleName(name, res)
         } else {
            res.json({
               msg: "Dato de busqueda invalido",
               success: false,
               ErrorCode: 2
            })
         }
      } else if (last_name) {
         if (regexFullText(last_name)) {
            searchbarUserSingleLast_Name(last_name, res)
         } else {
            res.json({
               msg: "Dato de busqueda invalido",
               success: false,
               ErrorCode: 3
            })
         }
      } else {
         getAllUsers(res)
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

export const searchbarEmailController = (req, res) => {
   const { full_name, email } = req.body

   try {
      if (full_name && email) {
         if (regexFullText(full_name) && regexEmail(email)) {
            searchbarEmailDouble(full_name, email, res)
         } else {
            res.json({
               msg: "Dato de busqueda invalido",
               success: false,
               ErrorCode: 1
            })
         }
      } else if (full_name) {
         if (regexFullText(full_name)) {
            searchbarEmailSingleFull_Name(full_name, res)
         } else {
            res.json({
               msg: "Dato de busqueda invalido",
               success: false,
               ErrorCode: 2
            })
         }
      } else if (email) {
         if (regexEmail(email)) {
            searchbarEmailSingleEmail(email, res)
         } else {
            res.json({
               msg: "Dato de busqueda invalido",
               success: false,
               ErrorCode: 4
            })
         }
      } else {
         getAllEmails(res)
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