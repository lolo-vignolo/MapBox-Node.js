require('dotenv').config();
const {
  inquirerMenu,
  pausa,
  leerInput,
  listaDeLugares,
} = require('./helpers/inquirer');

require('colors');

const Busquedas = require('./models/busquedas');

const main = async () => {
  const busqueda = new Busquedas();
  let option = '';

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        //Mostar mensaje preguntando por la ciudad
        const input = await leerInput('Ingrese una ciudad');

        //Buscar la ciudad
        const ciudades = await busqueda.ciudad(input);

        // seleccionar una ciudad de la lista
        const placeId = await listaDeLugares(ciudades);
        if (placeId === '0') continue;

        //id de la ciudad seleccionada
        const myChoice = ciudades.find((ciudad) => ciudad.id === placeId);

        //guardar en DB

        busqueda.guardarHistorial(myChoice.name);

        //clima

        const climaId = await busqueda.clima(myChoice.lat, myChoice.lng);

        //mostrar resultados
        console.clear();
        console.log(`\n===============================`.green);
        console.log('\n informacion del lugar seleccionado: \n');
        console.log(`Lugar: ${myChoice.name.green}`);
        console.log(`Latitud: ${myChoice.lat}`);
        console.log(`Longitud: ${myChoice.lng}`);
        console.log(`Temperatura: ${climaId.main.temp.green}`);
        console.log(`Maxima: ${climaId.main.temp_max}`);
        console.log(`Minima: ${climaId.main.temp_min}`);
        console.log(`sensacionTermica: ${climaId.main.feels_like}`);
        console.log(`Humedad: ${climaId.main.humidity}`);
        console.log(`Presion: ${climaId.main.pressure}`);
        console.log(
          `Clima: ${climaId.weather[0].description.green} ${climaId.weather[0].icon}`
        );

        break;

      case 2:
        //mostart historial

        console.clear();
        console.log(`\n===============================`.green);
        console.log('\n historial de busquedas: \n');
        await busqueda.cargarDB();
        const arrayplaces = busqueda.historial;
        arrayplaces.map((place, i) => {
          let upperPlacer = place.split(' ').map((p) => {
            return p[0].toUpperCase() + p.slice(1);
          });
          const idx = `${i + 1}`.green;
          return console.log(`${idx} ${upperPlacer.join(' ')}`);
        });

        break;
    }

    option !== 0 && (await pausa());
  } while (option !== 0);
};

main();
