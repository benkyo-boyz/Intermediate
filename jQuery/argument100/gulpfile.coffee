browserSync = require 'browser-sync'
browserify  = require 'browserify'
gulp        = require 'gulp'
mocha       = require 'gulp-mocha'
plumber     = require 'gulp-plumber'
gutil       = require 'gulp-util'
_           = require 'underscore'
buffer      = require 'vinyl-buffer'
source      = require 'vinyl-source-stream'
watchify    = require 'watchify'

DEST = "./dist"
SRC = "./src"
paths =
  js: ["#{SRC}/**/*.js"]
  reload: ["#{DEST}/**/*", "!#{DEST}/**/*.css"]

customOpts =
  entries: ["#{SRC}/jquery.js"]
  debug: true
opts = _.extend {}, watchify.args, customOpts
b = watchify browserify(opts)
b.transform 'babelify'
bundle = ->
  b.bundle().on 'error',  gutil.log.bind gutil, 'Browserify Error'
    .pipe source './jquery.js'
    .pipe buffer()
    .pipe gulp.dest DEST
gulp.task 'browserify', bundle
b.on 'update', bundle
#b.on 'log', gutil.log

gulp.task 'browserSync', ->
  browserSync
    startPath: 'index.html'
    server: baseDir: DEST

gulp.task 'browserify', bundle
b.on 'update', bundle
b.on 'log', gutil.log

gulp.task 'test', ->
   gulp.src "./test/**/*.js"
     .pipe mocha reporter: 'spec'

gulp.task 'watch', ->
  gulp.watch paths.js, ['browserify']
  gulp.watch paths.reload, -> browserSync.reload once: true

gulp.task 'default', ['watch', 'browserSync']
