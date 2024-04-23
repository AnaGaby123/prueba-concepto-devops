// DOCS: Siempre correr el script en la carpeta raíz del proyecto, de lo contrario creará los archivos en el path actual donde se ejecute el script
const ftp = require('basic-ftp');

/* DOCS: Ambientes permitidos: 'dev | qa | uat | prod' */
const environment = process.argv[2];
if (!environment) {
  console.log(['No se ha proporcionado un ambiente. Opciones válidas: dev | qa | uat | prod']);
  return;
}
const hosts = {
  dev: '172.24.32.33',
  qa: '172.24.32.32',
  prod: '172.24.20.17',
};
async function uploadFiles() {
  const client = new ftp.Client();

  try {
    // Conectar al servidor FTP
    await client.access({
      host: hosts[environment],
      user: 'front',
      password: 'front',
    });

    // Log
    client.trackProgress((info) => {
      if (info.type === 'upload') {
        console.log('Archivo subido: ', info.name);
      }
    });

    // Ruta en el servidor donde deseas cargar los archivos
    const remoteDir = '/';
    // Ruta local de la carpeta dist
    const localDir = `./dist/${environment}`;

    // Cargar archivos al servidor
    await client.ensureDir(remoteDir);
    console.log('Directorio remoto encontrado');
    await client.clearWorkingDir();
    console.log('Directorio remoto limpiado exitosamente');
    await client.uploadFromDir(localDir);
    console.log('Archivos cargados exitosamente.');
  } catch (err) {
    console.error('Error al cargar archivos:', err);
  } finally {
    client.trackProgress();
    client.close();
  }
}

uploadFiles();
