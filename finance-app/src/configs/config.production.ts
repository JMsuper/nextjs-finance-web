import getConfigs from './config.common';

const baseUrl =
  'http://ec2-3-37-127-31.ap-northeast-2.compute.amazonaws.com:80';
const mode = 'production';

const configProduction = getConfigs({ baseUrl, mode });

export default configProduction;
