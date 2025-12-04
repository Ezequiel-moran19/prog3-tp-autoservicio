import { Admin } from "../model/admin.model.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Buscar usuario en DB
export async function obtenerAdmin(nombre) {
    return await Admin.findOne({ where: { nombre } });
}

// Comparo contraseña ingresada (texto plano) VS hash almacenado en DB
export async function validarPassword(passPlano, passHasheadoDB) {
    return await bcrypt.compare(passPlano, passHasheadoDB);
}

// Creo Token JWT
export function crearToken(admin) {
    return jwt.sign(
        { id: admin.id, nombre: admin.nombre },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    );
}

// Guardar cookie segura httpOnly
export function guardarTokenEnCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 60 * 1000
    });
}
