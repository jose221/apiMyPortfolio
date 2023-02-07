const {v4: uuidv4} = require("uuid");
class HerandroDataController {
    init(socket, req={}){
        req.id = uuidv4()
        socket.send(JSON.stringify(req));
    }

    action(socket, req ={}){
        socket.send(JSON.stringify(req));
    }
}
module.exports = new HerandroDataController();
