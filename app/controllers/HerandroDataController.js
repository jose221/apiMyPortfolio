const {v4: uuidv4} = require("uuid");
const Response = require('../../modules/response');
const Service = require("../services/DataHerandroService");
const AuthService = require('../services/AuthService');

class HerandroDataController {
    init(socket, req={}, data ={}){
        var ip = req.connection?.remoteAddress || "anonimo";

        data.id = uuidv4()
        socket.send(JSON.stringify({...data, ip:ip}));
    }

    action(socket, req={}, data ={}){
        var ip = req.connection?.remoteAddress || "anonimo";

        socket.send(JSON.stringify({...data, ip:ip}));
    }

    async event(req, res){
        var ip = req.connection?.remoteAddress || "anonimo";
        req.body.ip = ip;
        let resService = {}
        let item = req.body;
        if(req.body.dtherandro){
            if (!item.uid) {
                item.uid = uuidv4();
                resService = await Service.create(await AuthService.getTokenDecrypt(req.body.dtherandro), item)
            } else {
                resService = await Service.update(await AuthService.getTokenDecrypt(req.body.dtherandro), item)
            }
        }
        delete req.body.user_id

        return res.status(200).json(req.body);
    }
}
module.exports = new HerandroDataController();
