const inquirer = require('inquirer');
require('colors');

const inquirerMenu = async () => {
  console.clear();

  console.log('==============================='.green);
  console.log('      Buscando ciudades'.white);
  console.log(`=============================== \n`.green);

  const { opcion } = await inquirer.prompt([
    // el opcion desestructurado es el opcion que viene del 'name' del objeto
    {
      type: 'list',
      name: 'opcion',
      message: 'Seleccione una opcion',
      choices: [
        {
          value: 1,
          name: `${'1.'.green} Buscar Ciudad`,
        },
        {
          value: 2,
          name: `${'2.'.green} Ver Historial`,
        },
        {
          value: 0,
          name: `${'3.'.green} Salir`,
        },
      ],
    },
  ]);

  return opcion;
};

const pausa = async () => {
  const { continuar } = await inquirer.prompt([
    {
      type: 'input',
      name: 'continuar',
      message: `\n Presione tecla ${'ENTER'.green} para continuar \n`,
    },
  ]);

  return continuar;
};

const leerInput = async (mensaje) => {
  // mensaje es lo que sale en el prompt como pregunta. Lo que el usuario responde viene de la instancia que creo luego.
  const { desc } = await inquirer.prompt([
    {
      type: 'input',
      name: 'desc',
      message: mensaje,
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return 'Debe ingresar una descripcion';
        }
      },
    },
  ]);

  return desc;
};

const listaDeLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, index) => {
    return {
      value: lugar.id,
      name: `${index + 1}. ${lugar.name}`,
    };
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.red} Salir`,
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione un Lugar',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const confirmDelate = async () => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Seleccione una opcion',
      choices: [
        {
          value: '1',
          name: `${'1.'.green} Eliminar Tarea`,
        },
        {
          value: '0',
          name: `${'0.'.red} Salir`,
        },
      ],
    },
  ]);

  return confirm;
};

const checkList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${index + 1}. ${tarea.description}`,
      checked: tarea.completedE ? true : false,
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione las tareas que desea completar',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listaDeLugares,
  confirmDelate,
  checkList,
};
