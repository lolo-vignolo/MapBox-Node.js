const { inquirerMenu, pausa } = require('./helpers/inquirer');

require('colors');

const main = async () => {
  let option = '';

  do {
    option = await inquirerMenu();
    console.log(option);

    await pausa();
  } while (option !== 0);
};

main();
