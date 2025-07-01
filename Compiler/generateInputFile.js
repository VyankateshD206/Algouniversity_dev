const fs = require("fs");
const path = require("path");
const {v4:uuid}  = require("uuid");
const dirInputs = path.join(__dirname,"inputs");

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs,{recursive:true}) // If any parent directories in the path do not exist, also create them recursively (i.e., one by one up the chain).

}

const generateInputFile = (inputs) =>{
    const jobId = uuid();
    const inputFileName = `${jobId}.txt`;
    const inputFilePath = path.join(dirInputs,inputFileName);
    fs.writeFileSync(inputFilePath,inputs);
    return inputFilePath;
}

module.exports = generateInputFile;