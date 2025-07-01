const { exec } = require("child_process");
const path = require("path");
const executeJava = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const dir = path.dirname(filepath);
  const className = path.basename(filepath, ".java");

  return new Promise((resolve, reject) => {
    // Compile
    exec(`javac ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stderr });
      }

      if (stderr) {
        return reject({ stderr });
      }

      // Run (Java needs to run from the directory of the .class file)
      exec(
        `cd ${dir} && java ${className}`,
        (error, stdout, stderr) => {
          if (error) {
            return reject({ error, stderr });
          }
          if (stderr) {
            return reject({ stderr });
          }
          resolve(stdout);
        }
      );
    });
  });
};

module.exports = executeJava;