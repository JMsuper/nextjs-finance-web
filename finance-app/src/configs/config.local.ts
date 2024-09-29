import getConfigs from './config.common';

const baseUrl = 'http://localhost:8080/api/v1';
const mode = 'local';

const configLocal = getConfigs({ baseUrl, mode });

export default configLocal;
