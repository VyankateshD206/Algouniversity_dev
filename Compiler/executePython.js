const { exec } = require("child_process");
const path = require("path");

const executePython = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`python "${filepath}"`, (error, stdout, stderr) => {
            if (error) {
                return reject({ error: error.message });
            }
            if (stderr) {
                return reject({ error: stderr });
            }
            resolve(stdout);
        });
    });
};

module.exports = executePython;
