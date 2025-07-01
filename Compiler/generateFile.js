const fs = require("fs");
const path = require("path");
const {v4:uuid}  = require("uuid");
const dirCodes = path.join(__dirname,"codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true}) // If any parent directories in the path do not exist, also create them recursively (i.e., one by one up the chain).

}

const generateFile = (code,language) =>{
    const jobId = uuid();
     const fileName = language === "java" ? "Main.java" : `${jobId}.${language}`;
    const filePath = path.join(dirCodes,fileName);
    fs.writeFileSync(filePath,code);
    return filePath;
}

module.exports = generateFile;