class Response{
    static error( code,e =null, message = "hubo un error inesperado"){
        if(e)console.log(e)
        return {
            response: "error",
            code: code,
            message: message
        }
    }
    static success(code,data = null){
        return {
            response: "success",
            code: code,
            message: "operación exitosa",
            data: data
        }
    }
}
module.exports = Response;
