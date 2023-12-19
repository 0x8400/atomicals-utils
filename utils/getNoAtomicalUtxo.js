const connectElectrum = require('./connectElectrum');

function filterUtxos(utxos) {
    return utxos.filter(utxo => !utxo.atomicals || utxo.atomicals.length === 0);
}

async function getNoAtomicalUtxo(address) {
    // Get atomical from connectElectrum
    const atomical = await connectElectrum.connectToElectrum();

    // Call a method on atomical and print the result
    const result = await atomical.getAtomicals(address);
    const utxos = result.utxos;

    const filteredUtxos = filterUtxos(utxos);
    //console.log(filteredUtxos);

    // Calculate total value of filtered utxos
    const totalValue = filteredUtxos.reduce((total, utxo) => total + utxo.value, 0);
    console.log('Total Value:', totalValue);

    return {
        noAtomUxto: filteredUtxos,
        totalValue: totalValue
    };
}
module.exports = {
    getNoAtomicalUtxo
};
getNoAtomicalUtxo("bc1pmxxwz2n2ng34fzv8nmzvzpm9sccjqfj3k8v6ds5jv94hcmwqg77swfhzmx");
// {
//     global: {
//       coin: 'Bitcoin',
//       network: 'mainnet',
//       height: 821894,
//       block_tip: '000000000000000000041b75443214e73232001450146326c702bf474f6355ac',
//       server_time: '2023-12-19T06:53:05.979107',
//       atomicals_block_tip: '44858763d41fba10d667c68259a3a6168fe1ed009d59963fb30fe3f0c563e463',
//       atomical_count: 147132,
//       atomicals_block_hashes: {
//         '821885': 'e180511314ad63899bc2903f927e51448365a701d6980a34d3a1dfa6911cf7c5',
//         '821886': '0c72108d941520e1503a96e7064dbf1e656500a3d03492d6aadf6700dfe2c13f',
//         '821887': '9fbedc5a06a3fb7891250f4a535a3c027777ff371c2509d7d1c7e35cf2a05ab0',
//         '821888': '8ad1d710adbd68ca37c3f880bf757d8a9f316e4529c068561e5f13b54916aa8f',
//         '821889': 'd90ab645c485084d914ef94a1798af7324212eeaefa44e53308aa299ea7441bf',
//         '821890': 'f5331c5d5f4d588f6d1ae1485ccb1ba80d6ff6b65434d0d0b63727f85fcb89d4',
//         '821891': 'd7e0f20c49148c87e89b1e8d7bf1ac94be703e5d55e6bd369b136acb37565606',
//         '821892': 'fb756114270448c428e1f28527dc8fea77add49d6b1feed942e893edebe5e1ad',
//         '821893': '081ba5e39adaf296273be8aa171256a0822b2fb54fd5bb25f57cf7bb628b8b0c',
//         '821894': '44858763d41fba10d667c68259a3a6168fe1ed009d59963fb30fe3f0c563e463'
//       }
//     },
//     atomicals: {
//       '8abe2424874b5c7a53b3e325c90230fc5f9d821d909ff38dcc98bbb13b8e62c2i0': {
//         atomical_id: '8abe2424874b5c7a53b3e325c90230fc5f9d821d909ff38dcc98bbb13b8e62c2i0',
//         atomical_number: 64375,
//         type: 'FT',
//         confirmed: 2000,
//         data: [Object],
//         subtype: 'decentralized',
//         ticker_candidates: [Array],
//         request_ticker_status: [Object],
//         request_ticker: 'bitvm',
//         ticker: 'bitvm'
//       },
//       '536737aadfaffa17233bca342be2571e14916f6a29003ff4766d515283e68e90i0': {
//         atomical_id: '536737aadfaffa17233bca342be2571e14916f6a29003ff4766d515283e68e90i0',
//         atomical_number: 85278,
//         type: 'FT',
//         confirmed: 54600,
//         data: [Object],
//         subtype: 'decentralized',
//         ticker_candidates: [Array],
//         request_ticker_status: [Object],
//         request_ticker: 'electron',
//         ticker: 'electron'
//       },
//       '0000d0ee78e491584ef34371a1ef755877893c8deb4adadc51c1cc4a7597fc89i0': {
//         atomical_id: '0000d0ee78e491584ef34371a1ef755877893c8deb4adadc51c1cc4a7597fc89i0',
//         atomical_number: 88630,
//         type: 'NFT',
//         confirmed: 1000,
//         data: [Object]
//       },
//       '00008e3eba4bf8e8bc6ac9c65254636bd21109b8d902e7a656878c744ea1fb06i0': {
//         atomical_id: '00008e3eba4bf8e8bc6ac9c65254636bd21109b8d902e7a656878c744ea1fb06i0',
//         atomical_number: 89774,
//         type: 'NFT',
//         confirmed: 1000,
//         data: [Object]
//       }
//     },
//     utxos: [
//       {
//         txid: '4d6fccc2594ccf5acf0be3ac7f7c4a3c0de849bcc67ce661d2f62369e8af9553',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: 'dbf684967d715735f57e87e32e7ea994135c92d7cc0d0f967754aee8a90c6567',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: 'e251af7b0ca7904c692d31feabc1343908c96b369bfc555ad608051264477f26',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: 'ac1da8a57cbc6002a318cbdc56746afb5eec8c201f2d48f429652b438f54b64f',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '2b86fbe1e9e0739df621220c7c8c3e6c2fd0292ebb55a13d7ba5f50737ff7bba',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '6c6a4f09e49039ea77e11cdad1d7dcf0d5f43adfcf3590947a7c8b88ace851cd',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: 'c1f0c111c0d7f2fd4e689c9130229f0513cd0e05f652ee8c7be51645c9cf37dc',
//         index: 0,
//         vout: 0,
//         height: 816840,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: 'a0ce5a3a2ae4a75b8913930fa8286d5de1817dcb6aed10265ac3e1db13006384',
//         index: 0,
//         vout: 0,
//         height: 816854,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '4b97482725023005e2a2622818b117bfbb63bd167e1811bc2c2c06bcf1748cac',
//         index: 0,
//         vout: 0,
//         height: 816855,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '281974b6ae3d7afc5752cc1d8a9ce3245af4ee056c401d4be5ce5b02e5fa30ba',
//         index: 0,
//         vout: 0,
//         height: 816855,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '30ef92f7c836a3b85249f27f204ef6e39cf1ad5b03f3e3df7826ecb8d1b8e486',
//         index: 0,
//         vout: 0,
//         height: 816855,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '9794c325d60aebfa6a55cf57332283b1231110b31189be3ff9e15a29f4225ab0',
//         index: 0,
//         vout: 0,
//         height: 816855,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: 'c2905aa86f233f98cf80c7eacb27422857c74e32072dc0a4a26f5919a5b7b6ab',
//         index: 0,
//         vout: 0,
//         height: 816894,
//         value: 1000,
//         atomicals: [Array]
//       },
//       {
//         txid: '850c8ed915cf26b697690a0587a8c9da0018a987a827eb3ef64204997bed9044',
//         index: 0,
//         vout: 0,
//         height: 816894,
//         value: 1000,
//         atomicals: [Array]
//       },
//       {
//         txid: '52795f41161f366522afda9909a1f27aeeb86e4c82692e9c07355cd1a285dec0',
//         index: 0,
//         vout: 0,
//         height: 818228,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '13e54c01fdd60f75d27738873138ca383cdc55252db358a12bdb4f89188bed76',
//         index: 0,
//         vout: 0,
//         height: 818290,
//         value: 1000,
//         atomicals: []
//       },
//       {
//         txid: '3f36772c0fdc99291ba2da615aa66af2a25dbbacc1b4bb72fb7fcc2c5b9df719',
//         index: 1,
//         vout: 1,
//         height: 818781,
//         value: 34458,
//         atomicals: []
//       },
//       {
//         txid: 'a8498d3f5c1c633df4d79591b299dd3c91e57efe8ecc6b3d1c72cd5c678b3487',
//         index: 0,
//         vout: 0,
//         height: 818958,
//         value: 54600,
//         atomicals: [Array]
//       },
//       {
//         txid: 'c6cf0dae0761b5035993a8095a5086bcdace6f0f9ea06b5bc67e3f62e8d0b6f3',
//         index: 0,
//         vout: 0,
//         height: 819065,
//         value: 1000,
//         atomicals: [Array]
//       },
//       {
//         txid: 'a85330fbe0a6e0e528e91ee57fdfa0dae166e43aec03ba643f0d309f7e6f7a21',
//         index: 0,
//         vout: 0,
//         height: 819070,
//         value: 1000,
//         atomicals: [Array]
//       },
//       {
//         txid: 'ba6fcf3e27eabb471f5a309a8251a0824852ab2888c0f8c699c16f7b4f5bad3e',
//         index: 1,
//         vout: 1,
//         height: 821729,
//         value: 86089,
//         atomicals: []
//       }
//     ]
//   }