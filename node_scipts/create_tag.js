/*DOCS: Debe ejecutarse en el directorio raíz del proyecto ../ProquifaDotNet*/

const shell = require('shelljs');
const {exec} = require('child_process');
const fs = require('fs');
const stream = require('stream');
const {mercurialFunctions} = require('./node-scripts-helpers');
/* DOCS: Ambientes permitidos: 'dev | qa | uat | prod' */
const environment = process.argv[2];

if (!environment) {
  console.log(['No se ha proporcionado un ambiente. Opciones válidas: dev | qa | uat | prod']);
  return;
}

const packageJsonPath = `${process.cwd()}/package.json`;
console.log(packageJsonPath);
//DOCS: Leer el contenido del archivo
const packageJsonVersionObject = shell.grep('version', packageJsonPath).stdout.split(',')[0];
const tagCommand = 'hg tag';
//DOCS: Verificar si el archivo existe
if (fs.existsSync(packageJsonPath)) {
  const getPackageJsonFinalVersion = () => {
    return packageJsonVersionObject.split(':')[1].toString().replace(/"/g, '').trim();
  };

  try {
    getBranchName(getPackageJsonFinalVersion());
  } catch (error) {
    shell.echo('Error al analizar el archivo JSON:', error);
  }
} else {
  shell.echo('El archivo no existe en la ruta especificada.');
}

function getBranchName(packageJsonVersion) {
  try {
    const commandGetBranch = 'hg branch';
    exec(commandGetBranch, function (failure, branch) {
      if (failure) {
        console.log(`[Failure-Branch] ${failure}}`);
        return;
      }
      getLastTag(branch.trim(), packageJsonVersion);
    });
  } catch (error) {
    console.log(`[Error-Branch] ${error}}`);
  }
}

function getLastTag(branchName, packageJsonVersion) {
  try {
    exec(`hg id -r "::. and branch(${branchName}) and tag()" --template {latesttag}`, function (
      failure,
      lastTag,
    ) {
      if (failure) {
        console.log(`[Failure-GetLastTag] ${failure}}`);
        return;
      }
      console.log(`last tag founded: ${lastTag.trim()}`);
      loadVersion(lastTag.trim(), branchName, packageJsonVersion);
    });
  } catch (error) {
    console.log(`[Error-Branch] ${error}}`);
  }
}

function loadVersion(lastTag, branchName, packageJsonVersion) {
  try {
    exec(`hg log -b . -r "descendants(${lastTag}) and not ancestors(${lastTag})"`, function (
      failure,
      logs,
    ) {
      const actualBranchLog = (array) => {
        array = array.filter((it) => it.trim() !== '');
        return array.filter(
          (it) =>
            it.toString().includes(branchName) ||
            (!it.toString().toLowerCase().includes('branch') && branchName === 'default'),
        );
      };

      const codeArray = actualBranchLog(logs.toString().split('changeset:'));
      // /* DOCS: El comando regresa por defaul el último commit antes del tag, el tag y los commits siguientes al tag
      //    Nota: Se interrumpe el flujo si solo contiene el último commit antes del tag y el tag
      // */
      console.log('logs->', codeArray.length);
      console.log('commits->', codeArray);
      if (codeArray.length <= 0) {
        console.error('No se encontraron cambios');
        return;
      }
      let nuevoArreglo = [];
      // DOCS: Si el primer commit que aparece es el tag lo desplazamos
      if (getSummary(codeArray[0].includes('Added tag'))) {
        nuevoArreglo = [...codeArray].slice(1);
      } else {
        // DOCS: Si el primer commit que aparece no es el tag no hacemos nada
        nuevoArreglo = [...codeArray];
      }
      const splitVersion = packageJsonVersion.split('.');
      let majorVersion = Number(splitVersion[0]);
      let minorVersion = Number(splitVersion[1]);
      let patchVersion = Number(splitVersion[2]);

      nuevoArreglo.forEach((it) => {
        if (isMajor(getSummary(it))) {
          majorVersion += 1;
          minorVersion = 0;
          patchVersion = 0;
        }
        if (isMinor(getSummary(it))) {
          minorVersion += 1;
          patchVersion = 0;
        }
        if (isPatch(getSummary(it))) {
          patchVersion += 1;
        }
      });

      const newVersion = `${majorVersion}.${minorVersion}.${patchVersion}`;
      console.log('before-version', packageJsonVersion);

      // DOCS: Cambiabamos el package.json a la nueva versión
      const packageVersion = `"version": "${newVersion}"`;
      shell.sed('-i', packageJsonVersionObject, '  ' + packageVersion.trim(), packageJsonPath);
      // DOCS: Cambiabamos el package.json a la nueva versión - end
      if (packageJsonVersion === newVersion) {
        console.log(['No se encontraron cambios en la versión ' + newVersion]);
        return;
      }
      commitAll(packageJsonVersion, newVersion);
      // updateRepo(newVersion);
    });
  } catch (error) {
    revertVersion(packageJsonVersion);
    console.log('error->', error);
  }
}

function updateRepo(newVersion) {
  mercurialFunctions('build', newVersion, environment);
}

function getSummary(code) {
  return (code.toString().split('summary:')[1] || '').trim();
}

function commitAll(oldVersion, newVersion) {
  const commitAndPush = `hg commit -m "chore: v${newVersion} on ${environment} environment"\n`;
  console.log('Agregando archivos nuevos...');
  try {
    exec(`hg add .`, function (code, add) {
      console.log('Archivos agregados' + add);
      console.log('Removiendo archivos eliminados...');
      exec(`hg addremove`, function (code, remove) {
        console.log('Archivos removidos' + remove);
        console.log('Generando commit...');
        exec(commitAndPush, function (failure, commit) {
          console.log('Commit generado' + commit);
          if (failure) {
            console.log('[Failure-Commit]', failure);
            revertVersion(oldVersion);
            return;
          }
          pushCommits(oldVersion, newVersion);
        });
      });
    });
  } catch (error) {
    revertVersion(oldVersion);
    console.log(`[Error-Commit and push]${error}`);
  }
}

function pushCommits(oldVersion, newVersion) {
  const comandPush = 'hg push --new-branch default';
  console.log('Enviando commit al repositorio remoto...');
  try {
    exec(comandPush, function (failure, add) {
      if (failure) {
        console.log('[Failure-Push-commit]', failure);
        revertVersion(oldVersion);
        return;
      }
      console.log(
        'Se han guardado los cambios en el repositorio y actualizado en el servidor remoto',
      );
      createTag(oldVersion, newVersion);
    });
  } catch (error) {
    revertVersion(oldVersion);
    console.log(`[Error-Push-commit]${error}`);
  }
}

function createTag(oldVersion, newVersion) {
  console.log('newVersion->', newVersion);
  try {
    const nameTag = `v${newVersion}-${environment}`;
    exec(`${tagCommand} ${nameTag}`, function (failure, code) {
      if (failure) {
        console.log('[Failure-Tag]', failure);
        revertVersion(oldVersion);
        return;
      }
      pushTag(oldVersion, newVersion);
    });
  } catch (error) {
    console.log(`[Error-Tag]${error}`);
  }
}

function pushTag(oldVersion, newVersion) {
  const comandPush = 'hg push  --traceback';
  try {
    exec(`${comandPush}`, function (failure, code) {
      if (failure) {
        console.log('[Failure-Push-tag]', failure);
        revertVersion(oldVersion);
        return;
      }
      buildProject(oldVersion, newVersion);
    });
  } catch (error) {
    revertVersion(oldVersion);
    console.log(`[Error-Push-tag]${error}`);
  }
}

function buildProject(oldVersion, newVersion) {
  try {
    exec(`npm run build-${environment}`, function (failure, code) {
      if (failure) {
        console.log('[Failure-Build-Project]', failure);
        revertVersion(oldVersion);
        return;
      }
      successMessage(newVersion);
    });
  } catch (error) {
    console.log(`[Error-Build-Project]${error}`);
  }
}

//DOCS:HELPERS

function revertVersion(oldVersion) {
  console.log(`[Rollback] V.${oldVersion}`);
  const packageVersion = `"version": "${oldVersion}"`;
  shell.sed('-i', packageJsonVersionObject, '  ' + packageVersion.trim(), packageJsonPath);
}

function generateVersion(major, minor, patch, actualVersion) {
  const splitVersion = actualVersion.toString().split('.');
  const majorVersion = Number(splitVersion[0] || 0);
  const minorVersion = Number(splitVersion[1] || 0);
  const patchversion = Number(splitVersion[2] || 0);
  if (major > 0) {
    return `${major + majorVersion}.0.0`;
  }
  if (minor > 0) {
    return `${majorVersion}.${minor + minorVersion}.0`;
  }
  if (patch > 0) {
    return `${majorVersion}.${minorVersion}.${patch + patchversion}`;
  }
  return actualVersion;
}

function isMajor(code) {
  let exist = false;
  MAJOR.forEach((it) => {
    if (code.startsWith(it)) {
      exist = true;
      return;
    }
  });
  return exist;
}

function isMinor(code) {
  let exist = false;
  MINOR.forEach((it) => {
    if (code.startsWith(it)) {
      exist = true;
      return;
    }
  });
  return exist;
}

function isPatch(code) {
  let exist = false;
  PATCH.forEach((it) => {
    if (code.startsWith(it)) {
      exist = true;
      return;
    }
  });
  return exist;
}

function successMessage(newVersion) {
  console.log(
    '╔═════════════════.★.═════════════════════╗ \t\n' +
      `           SUCCESS ${newVersion}\t
` +
      '╚═════════════════.★.═════════════════════╝\t\n ',
  );
}

const MAJOR = ['feat!', 'fix!', 'build!'];
const MINOR = ['feat', 'build!', 'perf', 'test'];
const PATCH = ['fix', 'docs', 'style', 'refactor'];
