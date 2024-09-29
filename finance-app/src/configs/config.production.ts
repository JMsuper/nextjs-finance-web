import getConfigs from './config.common';

const baseUrl = 'https://snowball-stock.site/api/v1';
const mode = 'production';

const configProduction = getConfigs({ baseUrl, mode });

export default configProduction;
