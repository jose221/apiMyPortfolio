const {v4: uuidv4} = require("uuid");
class HerandroDataController {
    init(socket, req={}){
        var ip = req.connection.remoteAddress || "anonimo";
        req.id = uuidv4()
        socket.send(JSON.stringify({...req, ip:ip}));
    }

    action(socket, req ={}){
        var ip = req.connection.remoteAddress || "anonimo";
        socket.send(JSON.stringify({...req, ip:ip}));
    }
}
module.exports = new HerandroDataController();
