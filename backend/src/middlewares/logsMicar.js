const HandleDatabaseLogs = (req, res, next) => {
    const time = new Date()
    const url = req.url
    const method = req.method
    console.log(` Hora ejecución de servicio ${time} servicio ejecutado:
    [API:  --> ${url} / Methpod --> ${method}]`)
    next();
}




module.exports = {HandleDatabaseLogs}