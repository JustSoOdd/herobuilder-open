import fs from 'fs';
import path from 'path';

export default async () => {
  const dataDir = path.join(__dirname, '../../ggunleashed-assets/HeroData/');
  const targetFile = path.join(__dirname, '../src/js/heroes.json');
  var heroes = [];
  var fileCount = 0;

  fs.readdir(dataDir, (err, files) => {
    if (err) {
      throw err;
    }

    console.log('Joining ' + files.length + ' files');

    files.forEach((file) => {
      console.log('Reading ' + file);
      fileCount++;

      fs.readFile(dataDir + file, 'utf-8', (err, fileContents) => {
        console.log('Parsing ' + file);
        if (err) {
          throw err;
        }

        heroes.push(JSON.parse(fileContents));

        if (0 === --fileCount) {
          console.log('Writing to ' + targetFile);
          fs.writeFile(targetFile, JSON.stringify(heroes), (err) => {
            if (err) {
              throw err;
            }

            console.log('Wrote file to ' + targetFile);
          });
        }
      });
    });
  });
}
