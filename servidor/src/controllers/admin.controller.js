import { Producto } from "../model/producto.model.js";
import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";
import { obtenerAdmin, validarPassword, crearToken, guardarTokenEnCookie } from "../helpers/auth.helpers.js";

export class adminController{

    static async login(req,res){
        res.render("login");
    }

    static async dashboard(req,res){
        res.render("dashboard"); 
    }

    static async altaProducto(req,res){
        res.render("altaProducto");
    }

    static async editarProducto(req,res){
        const producto = await Producto.findByPk(req.params.id);
        res.render("editarProducto", { producto });
    }

    static async ingresar(req, res){
        const { nombre, pass } = req.body;

        try {
            const admin = await obtenerAdmin(nombre);
            if (!admin)
                return res.render("login", { error: "Credenciales incorrectas" });

            const passwordOk = await validarPassword(pass, admin.pass);
            if (!passwordOk)
                return res.render("login", { error: "Credenciales incorrectas" });

            const token = crearToken(admin);
            guardarTokenEnCookie(res, token);

            return res.redirect("/admin/dashboard");

        } catch (err) {
            console.error("Error en login:", err);
            res.render("login", { error: "Error al iniciar sesión" });
        }
    }

    static async salir(req,res){
        res.clearCookie("token");
        return res.redirect("/admin/login");
    }

    // esto es para postman 
    static async registrar(req,res){
        try {
            const { nombre, pass } = req.body;
            const hashed = await bcrypt.hash(pass, 10);
            const admin = await Admin.create({ nombre, pass: hashed });

            res.status(201).json({ msg: "Admin creado", admin });
        } catch (err) {
            console.log()
            res.status(500).json({ error: "Error al registrar admin" });
        }
    }
}
