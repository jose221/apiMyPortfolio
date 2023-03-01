const {v4: uuidv4} = require("uuid");
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

    event(req, res){
        var ip = req.connection?.remoteAddress || "anonimo";
        if(!req.body.uid) req.body.uid = uuidv4();
        req.body.ip = ip;

        let item = req.body;

        return res.status(200).json(item);
    }
}
module.exports = new HerandroDataController();
