import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from "../models/User.js";
class SessionController {
    async store(req, res) {
        const { mail, password } = req.body;
           console.log(req.body)
        try {
            const fulano = await User.findOne({
                where: { mail: mail }
            });

            if (!fulano) { return res.status(400).json({ message: "email nao encontrado" }) }

            let isvalid = await fulano.checkPassword(password);

            // Throw usada para forcar erro caso acontece algo.
            // throw ({error: 1011, message: 'Erro interno no servidor'});


            if (!isvalid) {
                return res.status(400).json({ message: "senha invalida" })
            }

            const { id } = fulano;

            let token = jwt.sign(  { id }, authConfig.secret, { expiresIn: authConfig.expiresIn } );


            return res.status(200).json({user: fulano, token:token});


        } catch (error) {
            console.log("errorr => ", error);
            if (error.error === 1010) {
                return res.status(400).json(error.message);
            } else {
                return res.status(400).json("Erro generico");

            }

        }
    }


    async exemplo(req, res) {

        try {

            return res.json({ ok: true })

        } catch (error) {
            console.log("errorr => ", error);


        }

    }


}
export default new SessionController();