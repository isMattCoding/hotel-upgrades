const appServer = require('./server');

const HOST = 'localhost';
const PORT = 8000;

appServer.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));
