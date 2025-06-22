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
    // To apply headers to specific files or patterns,
    // see prettyyellowdog/gulp-awspublish-headers
    //
};

gulp
  .src('./examples/**/*.js')
  .pipe(publisher.publish(headers))
  .pipe(publisher.sync())
  .pipe(awspublish.reporter());

