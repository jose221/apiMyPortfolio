const {v4: uuidv4} = require("uuid");
class HerandroDataController {
    init(socket, req={}){
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        req.id = uuidv4()
        socket.send(JSON.stringify({...req, ip}));
    }

    action(socket, req ={}){
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        socket.send(JSON.stringify({...req, ip}));
    }
}
module.exports = new HerandroDataController();
