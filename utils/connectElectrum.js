// utils/connectElectrum.js
const { Atomicals, ElectrumApi } = require('../atomicals-js/dist');

// 根据环境变量 `network` 选择 Electrum API URLs
const electrumUrls = process.env.NETWORK === 'testnet'
  ? [process.env.ELECTRUMX_PROXY_TEST_URL || 'https://eptestnet.atomicals.xyz/proxy']
  : [
      process.env.ELECTRUMX_PROXY_BASE_URL,
      process.env.ELECTRUMX_PROXY_BASE_URL1,
      process.env.ELECTRUMX_PROXY_BASE_URL2
    ].filter(url => url);
    
async function connectToElectrum() {
    if (electrumUrls.length === 0) {
      throw new Error('No Electrum API URLs provided');
    }
  
    const RETRY_DELAY_MS = 5000; // 重试间隔，例如 5000 毫秒（5秒）
  
    for (const url of electrumUrls) {
      let attempts = 0;
      while (attempts < 3) { // 最多重试次数
        try {
          console.log(`Attempting to connect to Electrum API at: ${url}`);
          const client = ElectrumApi.createClient(url);
          const atomicals = new Atomicals(client);
          
          const globalData = await atomicals.global(0, true);
          if (globalData && globalData.success) {
            console.log(`Connected to Electrum API at: ${url}`);
            return atomicals;
          } else {
            console.warn(`Connection to ${url} was unsuccessful, retrying...`);
          }
        } catch (error) {
          console.warn(`Failed to connect to ${url}, retrying in ${RETRY_DELAY_MS / 1000} seconds. Error: ${error}`);
        }
  
        await delay(RETRY_DELAY_MS);
        attempts++;
      }
    }
  
    throw new Error('Unable to connect to any Electrum API URLs');
  }
  const connectToElectrumWithTimeout = async () => {
    const timeoutMilliseconds = 10000; // Adjust the timeout value as needed
    try {
      return await Promise.race([
        connectToElectrum(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), timeoutMilliseconds)),
      ]); // Assuming Atomicals is the expected type
    } catch (error) {
      throw error; // Re-throw the error to be handled in the calling function
    }
  };
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
module.exports = {
  connectToElectrum,
  connectToElectrumWithTimeout
};
