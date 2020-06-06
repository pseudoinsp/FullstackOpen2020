const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')

http.createServer(app)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})