var fs = require('fs');
var gulp = require('gulp');
var awspublish = require('../lib');

var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
var publisher = awspublish.create(credentials);

var headers = {
    //
    // This will be applied globally to all files
    //
    "Cache-Control": "public, max-age=3600",
    //
    // These will be applied to specific files using the glob pattern
    // and will replace matching global settings for that file
    //
    "**/*.js": { "Cache-Control": "public, max-age=2592000" },
    "**/*.png": { "Cache-Control": "public, max-age=2592000" }
};

gulp
  .src('./examples/**/*.js')
  .pipe(publisher.publish(headers))
  .pipe(publisher.sync())
  .pipe(awspublish.reporter());

