import jwt from "jsonwebtoken";
import { crearToken, guardarTokenEnCookie } from "../helpers/auth.helpers.js";

export function verificarAdmin(req, res, next) {

  // Leo la cookie
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect("/admin/login");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = data;// guardo los datos del admin en la request

    const nuevoToken = crearToken(data);
    guardarTokenEnCookie(res, nuevoToken);

    next();

  } catch (err) {
    return res.redirect("/admin/login");
  }
}
