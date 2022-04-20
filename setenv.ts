const fs = require('fs');
const { argv } = require('yargs');
const dotenv = require('dotenv');

const environment = argv.env;
const envPath = `env/${ environment ? '.'+environment : '' }.env`;
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const targetPath = `src/environments/environment${ environment ? '.prod' : '' }.ts`;


let vars: string = '';
let initial: number = 0;
let total: number = Object.keys(envConfig).length;

for (const key in envConfig) {
    initial++;
    vars += key+': ';
    if (`${envConfig[key]}`.toUpperCase() === 'TRUE' || `${envConfig[key]}`.toUpperCase() === 'FALSE' || !isNaN(envConfig[key])) {
        vars += envConfig[key];
    } else {
        vars += `"${envConfig[key]}"`;
    }

    if (initial < total) {
        vars += ',\n\t';
    }
}


const environmentFileContent = `
export const environment = {
    ${vars}
};`;

fs.writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables of ${envPath} to ${targetPath}`);
});