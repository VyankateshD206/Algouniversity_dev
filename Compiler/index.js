require('dotenv').config(); 
const https  = require('https');
const fs = require('fs');
const { urlencoded } = require("body-parser");
const express  = require("express");
const app = express();
const cors = require('cors');

const generateFile = require("./generateFile");
const executeCpp = require("./executeCpp");
const executePython  = require("./executePython");
const executeJava = require("./executeJava");
const generateInputFile = require('./generateInputFile');

app.use(cors({
   origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.post("/run", async (req, res) => {
    const { code,input,language} = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "empty code body" });
    }

    try {
        const filePath = generateFile(code,language);
        const inputFilePath = generateInputFile(input)
        let output;
        if (language === "cpp") {
            output = await executeCpp(filePath,inputFilePath);
        }else if(language==="py"){
            output = await executePython(filePath);
        }else{
            output = await executeJava(filePath);
        }


        res.json({output});
    } catch (error) {
        console.error("Execution error:", error);  
        res.status(500).json({ success: false, error: error.message || error.stderr || "Unknown error" });
    }
});


const options = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.cert')
};

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`HTTPS Server running on port ${process.env.PORT}`);
});
