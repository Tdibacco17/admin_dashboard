import { connection } from "../../../config.js"

export const updateUser = (user, id, res) => {

   connection.query(`UPDATE User SET ? WHERE User_ID = ?;`, [user, id], function (err, result, filed) {
      if (err) throw err
      if (result.affectedRows > 0) {
         res.json({
            msg: "Usuario modificado",
            success: true,
            result
         })
      } else {
         res.json({
            msg: "Usuario no encontrado",
            success: false,
            ErrorCode: 11
         })
      }
   })
}
