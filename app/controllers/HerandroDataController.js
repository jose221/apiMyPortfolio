const {v4: uuidv4} = require("uuid");
const Response = require('../../modules/response');
const Service = require("../services/DataHerandroService");
const AuthService = require('../services/AuthService');
const DataHerandroEventService = require('../services/DataHerandroEventService');
const DataHerandroEventActionService = require('../services/DataHerandroEventActionService');
const requestIp = require("request-ip");
class HerandroDataController {
    init(socket, req={}, data ={}){
        //var ip = req.connection?.remoteAddress || "anonimo";
        var ip = requestIp.getClientIp(req) || "anonimo";

        data.id = uuidv4()
        socket.send(JSON.stringify({...data, ip:ip}));
    }

    action(socket, req={}, data ={}){
        //var ip = req.connection?.remoteAddress || "anonimo";
        var ip = requestIp.getClientIp(req) || "anonimo";

        socket.send(JSON.stringify({...data, ip:ip}));
    }
    async EventAction(req, res){

    }
    async event(req, res){
        //var ip = req.connection?.remoteAddress || "anonimo";
        var ip = requestIp.getClientIp(req) || "anonimo";
        req.body.ip = ip;
        let resService = {}
        let item = req.body;
        let itemEventAction = req.body.events || [];
        if(req.body.dtherandro){
            let user = await AuthService.getTokenDecrypt(req.body.dtherandro);
            if (!item.uid) {
                item.uid = uuidv4();
                resService = await Service.create(user, item)
            } else {
                resService = await Service.update(user, item)
            }
        }

        return res.status(200).json(req.body);
    }
}
module.exports = new HerandroDataController();
