// DOCS: Siempre correr el script en la carpeta raíz del proyecto, de lo contrario creará los archivos en el path actual donde se ejecute el script
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');
const fs = require('fs');
const shell = require('shelljs');
const {mercurialFunctions} = require('./node-scripts-helpers');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const {exec} = require('child_process');
/* DOCS: Ambientes permitidos: 'dev', 'qa' */
const environment = process.argv[2];
if (!environment) {
  console.log(['No se ha proporcionado un ambiente. Opciones válidas: dev | qa | uat | prod']);
  return;
}
const apiCatalogsLabel = 'API Catálogos';
const apiLogisticLabel = 'API Logística';
const apiFinancesLabel = 'API Finanzas';
let apiHost = '';
let version = '';
let catalogsResponse;
let logisticsResponse;
let financesResponse;
const filePaths = ['projects/api-catalogos', 'projects/api-logistica', 'projects/api-finanzas'];

// TODO: Tomar las ip desde ambientes
switch (environment) {
  case 'dev': {
    apiHost = '172.24.32.33';
    break;
  }
  case 'qa': {
    apiHost = '172.24.32.32';
    break;
  }
  case 'uat': {
    apiHost = '172.24.20.17';
    break;
  }
  case 'prod': {
    apiHost = '172.24.20.17';
    break;
  }
}
// Realiza conexion al api
const request = async () => {
  console.log(`Conectando al server en ambiente '${environment}' '${apiHost}'`);
  const response = await fetchApi(`https://${apiHost}/catalogos`);
  return getResponse(response);
};
// Obtiene la version del api
function getResponse(response) {
  console.log('Obteniendo la version de las APIS...');
  version = response.API.Version;
  console.log('APIS version: ', version);
  return downLoadCatalogFiles();
}

// Descarga el archivo Json de las apis
// Api Catalogos
const downLoadCatalogFiles = async () => {
  console.log('Descargando documentación de las APIS...');
  catalogsResponse = await fetchApi(`https://${apiHost}/catalogos/restclient/default`);
  console.log('Se ha descargado la documentación del ' + apiCatalogsLabel);
  return downLoadLogisticFiles();
};
// Api logistica
const downLoadLogisticFiles = async () => {
  logisticsResponse = await fetchApi(`https://${apiHost}/logistica/restclient/default`);
  console.log('Se ha descargado la documentación del ' + apiLogisticLabel);
  return downLoadFinancesFiles();
};
// Api finanzas
const downLoadFinancesFiles = async () => {
  console.log('Descargando api finanzas...');
  financesResponse = await fetchApi(`https://${apiHost}/finanzas/restclient/default`);
  console.log('Se ha descargado la documentación del ' + apiFinancesLabel);
  return findDirectory();
};
// Busca si existen los directorios y los crea si no ecisten
function findDirectory() {
  filePaths.forEach((path) => {
    if (!fs.existsSync(path)) {
      shell.mkdir('-p', `${path}/src/lib`);
      console.log('Se creo el directorio ' + `${path}/src/lib`);
    }
  });
  return writeFiles();
}
// Creo o sobreescribe archivo swagger.json con la respuesta obtenida del api
function writeFiles() {
  fs.writeFile(
    './projects/api-catalogos/src/lib/swagger.json',
    JSON.stringify(catalogsResponse),
    function (err) {
      if (err) throw err;
    },
  );
  fs.writeFile(
    './projects/api-logistica/src/lib/swagger.json',
    JSON.stringify(logisticsResponse),
    function (err) {
      if (err) throw err;
    },
  );
  fs.writeFile(
    './projects/api-finanzas/src/lib/swagger.json',
    JSON.stringify(financesResponse),
    function (err) {
      if (err) throw err;
    },
  );
  return ngSwaggerCatalogs();
}
// Genera las apis de los archivos Json
function ngSwaggerCatalogs() {
  exec(
    `ng-swagger-gen -i "./projects/api-catalogos/src/lib/swagger.json" -c "./swagger-gen-config/catalogs-api.json"`,
    function (code, compile) {
      if (compile) {
        shell.echo('Se han generado los modelos y servicios del ' + apiCatalogsLabel);
        return ngSwaggerLogistic();
      } else {
        shell.echo('Error al generar compilado');
        shell.echo('code: ', code);
      }
    },
  );
}
function ngSwaggerLogistic() {
  exec(
    `ng-swagger-gen -i "./projects/api-logistica/src/lib/swagger.json" -c "./swagger-gen-config/logistics-api.json"`,
    function (code, compile) {
      if (compile) {
        shell.echo('Se han generado los modelos y servicios del ' + apiLogisticLabel);
        return ngSwaggerFinances();
      } else {
        shell.echo('Error al generar compilado');
        shell.echo('code: ', code);
      }
    },
  );
}
function ngSwaggerFinances() {
  exec(
    `ng-swagger-gen -i "./projects/api-finanzas/src/lib/swagger.json" -c "./swagger-gen-config/finances-api.json"`,
    function (code, compile) {
      if (compile) {
        shell.echo('Se han generado los modelos y servicios del ' + apiFinancesLabel);
        return changeFilters();
      } else {
        shell.echo('Error al generar compilado');
        shell.echo('code: ', code);
      }
    },
  );
}
// Reemplaza el tipo de datos de los filtros a los servicios
function changeFilters() {
  console.log('Reemplazando los filtros...');
  const filename_api_catalogos_filter = './projects/api-catalogos/src/lib/models/filter-tuple.ts';
  const filename_api_finanzas_filter = './projects/api-finanzas/src/lib/models/filter-tuple.ts';
  const filename_api_logistica_filter = './projects/api-logistica/src/lib/models/filter-tuple.ts';

  const replace_filter = 'ValorFiltro?: string | boolean;';

  shell.sed('-i', /^.*ValorFiltro?.*$/, `  ${replace_filter}`, filename_api_catalogos_filter);
  shell.sed('-i', /^.*ValorFiltro?.*$/, `  ${replace_filter}`, filename_api_finanzas_filter);
  shell.sed('-i', /^.*ValorFiltro?.*$/, `  ${replace_filter}`, filename_api_logistica_filter);
  console.log('Se reemplazaron los filtros');
  console.log('Guardando cambios en el repositorio');
  return updateRepo();
}
// Actualiza el repo remoto con los cambios
function updateRepo() {
  mercurialFunctions('update', version, environment);
}

request();

async function fetchApi(arg) {
  const response = await fetch(arg, {
    method: 'GET',
    agent: httpsAgent,
  });
  return await response.json();
}
