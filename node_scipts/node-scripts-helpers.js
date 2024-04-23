const {exec} = require('child_process');

function mercurialFunctions(config, version, environment) {
  const scriptPush =
    config === 'build'
      ? `hg commit -m "Build ${version} on ${environment} environment"`
      : `hg commit -m "feat(apis-${environment}): Se crea la versión ${version} en ${environment} "`;
  console.log('Agregando archivos nuevos...');
  exec(`hg add .`, function (code, add) {
    console.log('Archivos agregados' + add);
    console.log('Removiendo archivos eliminados...');
    exec(`hg addremove`, function (code, remove) {
      console.log('Archivos removidos' + remove);
      console.log('Generando commit...');
      exec(scriptPush, function (code, commit) {
        console.log('Commit generado' + commit);
        console.log('Enviando commit al repositorio remoto...');
        exec(`hg push --new-branch default`, function (code, add) {
          console.log(
            'Se han guardado los cambios en el repositorio y actualizado en el servidor remoto',
          );
        });
      });
    });
  });
}
module.exports = {
  mercurialFunctions,
};
