const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
const connectElectrum = require('../utils/connectElectrum');

function startTask(threadCount) {
    const tasks = [];

    for (let i = 0; i < threadCount; i++) {
        const task = new Worker('./mint_task/mint_ft.js');
        tasks.push(task);
    }

    tasks.forEach((task,index) => {
        task.on('message', message => {
            console.log(`Task ${message.taskId} completed: ${message.result}`);
            tasks.forEach(task => task.terminate());
            startTask(threadCount);
        });

        // 监听stdout事件并将输出写入日志文件
        task.stdout.on('data', data => {
            const logData = data.toString();
            appendToLogFile(logData, index);
        });
    });
}

// Log directory path
const logDirectory = path.join(__dirname, 'log');

// Function to append data to log file
function appendToLogFile(data, taskName) {
    const logFileName = `task_${taskName}.log`;
    const logFilePath = path.join(logDirectory, logFileName);
       // Ensure that the log directory exists
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }



    fs.appendFileSync(logFilePath, data);
}

async function mintDftInteractive(options, address, ticker, WIF) {
    try {
        const atomical = await connectElectrum.connectToElectrum();
        const result = await atomical.mintDftInteractive({  
            rbf: options.rbf,
            satsbyte: parseInt(options.satsbyte),
            disableMiningChalk: options.disableMiningChalk,    
        }, address, ticker, WIF);
        return result;
    } catch (error) {
        return {
            success: false,
            message: error.toString(),
            error
        };
    } 
}

// Read private.json file to get address and private key
const privateData = fs.readFileSync('./private.json', 'utf8');
const { address, privateKey } = JSON.parse(privateData);

mintDftInteractive({
    rbf: true,
    satsbyte: 150,
    disableMiningChalk: true}, address, 'neutron', privateKey)
module.exports = {
    mintDftInteractive,
    startTask
};
