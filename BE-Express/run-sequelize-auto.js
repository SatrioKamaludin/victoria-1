require('dotenv').config();
const { exec } = require('child_process');

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres'
};

const command = `npx sequelize-auto -h ${dbConfig.host} -d ${dbConfig.database} -u ${dbConfig.user} 
                -p ${dbConfig.port} -x ${dbConfig.password} -e postgres -o ./src/models`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
