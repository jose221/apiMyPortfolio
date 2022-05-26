const userModel = require('../models/User');
const Response = require('../../modules/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APIToken = require('../../config/APIToken');
class AuthService{
    async authLogin(data){
        try{
            const user = await userModel.findOne({
                attributes: ['id', 'name', 'email','password'],//eliminar password
                where:{
                email:data.email
                }});
            if(user){
                const validPassword = await bcrypt.compare(data.password, user.password);
                if(validPassword){
                    let current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
                    let followingDay = current.getTime() + Number.parseInt(APIToken.EXPIRED_MS_TOKEN) // + 1 day in ms
                    const token = await jwt.sign({
                        ...
                        user.dataValues,
                        expired_token: followingDay

                    }, APIToken.SECRET_TOKEN)
                    if(token && user.dataValues.id){
                        delete user.dataValues.password;
                        await this.authSaveToken(user.dataValues.id, token);
                        return Response.success(200,{...user.dataValues,token: token, expired_token: followingDay});
                    }

                }
            }
            return Response.error( 400, null, "usuario y/o contraseña incorrecta");
        }catch (e){
            return Response.error(500, e)
        }
    }

    async authRegister(data){
        try{
            const existEmail = await userModel.findOne({
                where:{
                    email:data.email
                }});
            if(existEmail) return Response.error( 400, null, "el correo ya existe");
            else{
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const item = userModel.create(data);
                return (item)? Response.success(201, item) : Response.error(500);
            }
        }catch (e){
            return Response.error(500, e)
        }
    }
    async logout(token){
        try{
            const verified = await jwt.verify(token, APIToken.SECRET_TOKEN);
            if(verified){
                const token = await this.authRemoveToken(verified.id);
            }else{
                return Response.error(500, null, 'Token no valido')
            }
            if(token){
                return Response.success(201,{});
            }
        }catch (e){
            return Response.error(500, e)
        }
    }


    async authSaveToken(id, token){
        let res = false;
        try{
            const user =await userModel.update({ remember_token: token }, {
                where: {
                    id: id
                }
            });
            if(user){
                res = true;
            }
        }catch (e){
            console.log(e);
        }
        return res;

    }
    async authRemoveToken(id){
        let res = false;
        try{
            const user =await userModel.update({ remember_token: "" }, {
                where: {
                    id: id
                }
            });
            if(user){
                res = true;
            }
        }catch (e){
            console.log(e);
        }
        return res;

    }
    async verifyToken(token){
        let res = false;
        try{
            const verified = await jwt.verify(token, APIToken.SECRET_TOKEN);
            if(!verified) return Response.error(500, null, 'Token no valido');

            const user = await userModel.findByPk(verified.id, {
                attributes:['remember_token']
            });
            if(user){
                if(user.remember_token != token) return Response.error(500, null, 'Token no valido');
                else res = true;
            }
        }catch (e){
            console.log(e);
        }
        return res;

    }
    async getTokenDecrypt(token){
        let res = false;
        try{
            const verified = await jwt.verify(token, APIToken.SECRET_TOKEN);
            return verified;
        }catch (e){
            console.log(e);
        }
        return res;
    }
}
module.exports = new AuthService();
