// Quitar el 1 al final de los archivos

// const fs = require('fs');
// const path = require('path');
//
// // Directorio de los archivos
// const directory = `${process.cwd()}/src/assets/Images/logos`;
//
// fs.readdir(directory, (err, files) => {
//   if (err) throw err;
//
//   files.forEach(file => {
//     const ext = path.extname(file);
//     const nameWithoutExt = path.basename(file, ext);
//
//     // Comprobar si el nombre del archivo sin la extensión termina en '1'
//     if (nameWithoutExt.endsWith('1')) {
//       const oldPath = path.join(directory, file);
//       // Eliminar el '1' del final del nombre del archivo
//       const newPath = path.join(directory, nameWithoutExt.slice(0, -1) + ext);
//
//       fs.rename(oldPath, newPath, err => {
//         console.log(`Renamed file ${oldPath} to ${newPath}`);
//         if (err) throw err;
//       });
//     }
//   });
// });

// convertir a minusculas los nombres de los archivos

// ******************************************************
const fs = require('fs');
const path = require('path');

// Directorio de los archivos
const directory = `${process.cwd()}/src/assets/Images/logos`;

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const oldPath = path.join(directory, file);
    const newPath = path.join(directory, file.toLowerCase());

    fs.rename(oldPath, newPath, (err) => {
      console.log(`Renamed file ${oldPath} to ${newPath}`);
      if (err) throw err;
    });
  });
});

// eliminar guiones dobles

// ******************************************************
// const fs = require('fs');
// const path = require('path');
//
// // Directorio de los archivos
// const directory = `${process.cwd()}/src/assets/Images/logos`;
//
// fs.readdir(directory, (err, files) => {
//   if (err) throw err;
//
//   files.forEach(file => {
//     const oldPath = path.join(directory, file);
//     const newPath = path.join(directory, file.replace(/__/g, '_'));
//
//     fs.rename(oldPath, newPath, err => {
//       if (err) throw err;
//     });
//   });
// });
