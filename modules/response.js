const LoggerModule = require("./logger");


class Response extends LoggerModule{
    error( code,e =null, message = "hubo un error inesperado", additionalInfo = {}){
        if(e)console.log(e)
        this.logError(this.howCallMe(), e || message, additionalInfo)
        return {
            response: "error",
            code: code,
            message: message
        }
    }
    success(code,data = null){
        return {
            response: "success",
            code: code,
            message: "operación exitosa",
            data: data
        }
    }

    howCallMe() {
        const err = new Error();
        const stackLines = err.stack.split('\n').slice(1); // Saltamos la primera línea
        const callRoute = stackLines
            .map(line => {
                const matched = line.trim().match(/^at\s+(.*?)\s/);
                return matched && matched[1] ? matched[1] : null;
            })
            .filter(Boolean); // Quitamos nulos

        // Quitamos este mismo método del trace
        if (callRoute[0] && callRoute[0].includes('howCallMe')) {
            callRoute.shift();
        }

        // Invertimos el orden para que sea: último -> penúltimo -> ...
        const routeString = callRoute.reverse().join(' -> ');

        console.log(`[howCallMe] Ruta de llamadas: ${routeString}`);
        return routeString;
    }

}
module.exports = new Response();
