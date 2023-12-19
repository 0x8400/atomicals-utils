const mempoolJS = require("@mempool/mempool.js");
const bitcoin = require("bitcoinjs-lib");

const checkSecondInputSpent = async (psbtHex) => {
    try {
        const psbt = bitcoin.Psbt.fromHex(psbtHex);
        const secondInput = psbt.txInputs[1];
        const secondInputTxid = secondInput.hash.reverse().toString('hex');
        const { bitcoin: { transactions } } = mempoolJS({
            hostname: 'mempool.space'
        });
        //console.log(`Second input with txid ${secondInput.hash.reverse().toString('hex')} and index ${secondInput.index} has not been spent.`);
        console.log('secondInput value:', psbt.data.inputs[1].witnessUtxo.value)
        const txOutspend = await transactions.getTxOutspend({
            txid: secondInputTxid,
            vout: secondInput.index,
        });

        if (txOutspend.spent) {
            console.log(`Second input with txid ${secondInputTxid} and index ${secondInput.index} has been spent.`);
            return true;
        } else {
            console.log(`Second input with txid ${secondInputTxid} and index ${secondInput.index} has not been spent.`);
            return false;
        }
    } catch (error) {
        console.error(`Error checking second input: ${error}`);
        throw error;
    }
};

const checkUtxoSpent = async (txid, index) => {
    const { bitcoin: { transactions } } = mempoolJS({
        hostname: 'mempool.space'
    });

    try {
        const txOutspend = await transactions.getTxOutspend({
            txid,
            vout: index,
        });

        if (txOutspend.spent) {
            console.log(`UTXO with txid ${txid} and index ${index} has been spent.`);
            return true;
        } else {
            console.log(`UTXO with txid ${txid} and index ${index} has not been spent.`);
            return false;
        }
    } catch (error) {
        console.error(`Error checking UTXO: ${error}`);
        throw error;
    }
};


//checkUtxoSpent('6f00a2cedf59290dd761e24af6a6851d7170d1a853ccf29711b9647e5062eda1', 0);
checkSecondInputSpent('70736274ff0100fd08010200000002f49a6474a7af3f058fc0ab15ddeba5d6deb652737a715ad168cf6047ec7dc3b60100000000ffffffffa1ed62507e64b91197f2cc53a8d170711d85a6f64ae261d70d2959dfcea2006f0000000000ffffffff0448d50000000000002200204364063fac8829a931a752ecd9049e43425e2cebf83681876c556002bf389b00a4140b00000000002251203e8d6a53125b33b1fcd53e85177a7411df939c77013006cd92acc021aac1d5bfbc380000000000002251203e17e491f3485bc897ab3775830f9e5a055f05db456f50991d4f7fb989216bf4eee6c09e301000002200204364063fac8829a931a752ecd9049e43425e2cebf83681876c556002bf389b00000000000001012bd82acd9e301000002200204364063fac8829a931a752ecd9049e43425e2cebf83681876c556002bf389b00010304010000000001012b48d50000000000002251203e8d6a53125b33b1fcd53e85177a7411df939c77013006cd92acc021aac1d5bf010304830000000000000000')
module.exports = {
    checkUtxoSpent,
    checkSecondInputSpent
};