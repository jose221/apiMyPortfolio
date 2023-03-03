const {v4: uuidv4} = require("uuid");
const Response = require('../../modules/response');
const Service = require("../services/DataHerandroService");
const AuthService = require('../services/AuthService');
const DataHerandroEventService = require('../services/DataHerandroEventService');
const DataHerandroEventActionService = require('../services/DataHerandroEventActionService');
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
        //var ip = req.connection?.remoteAddress || "anonimo";
        var ip = req.clientIp || "anonimo";
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

            if(itemEventAction.length){
                let dataHerandro = await Service.get(user, {uid:req.body.uid, user_id: user.id});
                itemEventAction.forEach(async (item) => {
                    let dataHerandroEvent = await DataHerandroEventService.getAll(user, {user_id: user.id, eventCode:item.eventCode});
                    if(dataHerandroEvent.data.length){
                        let dataHerandroEventAction = await DataHerandroEventActionService.getAll(user, {user_id: user.id,data_herandro_event_id: dataHerandroEvent.data[0].id, label:item.label });
                        if(!dataHerandroEventAction.data.length){
                            await DataHerandroEventActionService.create(user, {...item, user_id: user.id, eventCode:item.eventCode, data_herandro_event_id: dataHerandroEvent.data[0].id})
                        }else{
                            if(dataHerandroEvent.data[0].n_repeat > dataHerandroEventAction.data.length || dataHerandroEvent.data[0].n_repeat == 0){
                                await DataHerandroEventActionService.create(user, {...item, user_id: user.id, eventCode:item.eventCode, data_herandro_event_id: dataHerandroEvent.data[0].id})
                            }
                        }
                    }
                });
            }
        }

        return res.status(200).json(req.body);
    }
}
module.exports = new HerandroDataController();
