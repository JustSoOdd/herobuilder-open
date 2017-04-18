/**
 * This file is solely used for building of assets
 */

var gulp = require('gulp');
var gm = require('gulp-gm');
var globby = require('globby');
var spritesmith = require('spritesmith');
var templater = require('spritesheet-templates');
var fs = require('fs');
var del = require('del');
var path = require('path');

var targetDir = './stat';
var assetPath = process.env.ASSETS || '../ggunleashed-assets';

/**
 * returns a better name for sprites
 */
function transformName(name) {
  // remove file extension
  name = name.split('.');
  name.pop();
  name = name.join('.');

  // only take last 2 directories
  name = name.split('/');
  name = name.slice(-2).join('_');

  // removes herotile from path
  name = name.replace('_HeroTile', '');

  return name;
}

/**
 * Creates the actual stylesheet
 */
function createStylesheet(targetFiles, filename, cb) {
  globby(targetFiles).then(function(files) {
    spritesmith({
      src: files,
      padding: 2,
      engineName: 'gmsmith',
      engineOptions: {
        quality: 20
      }
    }, function handleResult(err, result) {
      var sprites = [];
      var sprite;
      var k;
      var outputFile;

      for (k in result.coordinates) {
        sprite = result.coordinates[k];
        sprite.name = transformName(k);
        sprites.push(sprite);
      }

      result.properties.image = 'img/' + filename + '.png';
      fs.writeFile('src/img/' + filename + '.png', result.image, 'binary');

      outputFile = templater(
        {
          sprites: sprites,
          spritesheet: result.properties,
          spritesheet_info: {
            name: filename.toLowerCase()
          }
        },
        {
          format: 'scss_maps'
        }
      );

      fs.writeFile('src/sass/_' + filename + '.scss', outputFile, 'utf-8', function() {
        cb();
      });
    });
  });
}

/**
 * Gulp SubTask
 * Converts hero tiles to a more usable size
 */
gulp.task('spritify:herotiles:convert', ['clean'], function() {
  return gulp.src(path.join(assetPath, '/Heroes/*_HeroTile.png'))
    .pipe(gm(function(gmFile) {
      return gmFile.resize(null, 200);
    }))
    .pipe(gulp.dest('.tmp/img/Heroes'));
});

/**
 * Gulp SubTask
 * Creates the spritesheet for the hero tiles
 */
gulp.task('spritify:herotiles', ['spritify:herotiles:convert'], function(cb) {
  createStylesheet('.tmp/img/Heroes/*_HeroTile.png', 'heroes', cb);
});

/**
 * Gulp SubTask
 * Converts skills to a more usable size
 */
gulp.task('spritify:skills:convert', ['clean'], function() {
  return gulp.src(path.join(assetPath, '/Skills/*.png'))
    .pipe(gm(function(gmFile) {
      return gmFile.resize(50, 50);
    }))
    .pipe(gulp.dest('.tmp/img/Skills'));
});

/**
 * Gulp SubTask
 * Creates a spritesheet out of the skill icons
 */
gulp.task('spritify:skills', ['spritify:skills:convert'], function(cb) {
  createStylesheet('.tmp/img/Skills/*.png', 'skills', cb);
});

/**
 * Gulp SubTaks
 * Converts skin tiles to a more usable size
 */
 gulp.task('spritify:skintiles:convert', ['clean'], function() {
   return gulp.src(path.join(assetPath, '/Skins/*.png'))
     .pipe(gm(function(gmFile) {
       return gmFile.resize(null, 200);
     }))
     .pipe(gulp.dest('.tmp/img/Skins'));
 });

 /**
  * Gulp SubTask
  * Creates the spritesheet for the skin tiles
  */
 gulp.task('spritify:skintiles', ['spritify:skintiles:convert'], function(cb) {
   createStylesheet('.tmp/img/Skins/*.png', 'skins', cb);
 });


gulp.task('spritify', ['spritify:herotiles', 'spritify:skills', 'spritify:skintiles']);

gulp.task('clean', function(cb) {
  del([targetDir, '.tmp'], cb);
});

gulp.task('default', ['clean', 'spritify']);
