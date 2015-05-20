_ = require 'underscore'
gulp        = require 'gulp'
plumber     = require 'gulp-plumber'
browserSync = require 'browser-sync'
stylus      = require 'gulp-stylus'
watchify = require 'watchify'
transform = require 'vinyl-transform'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'
assign = require 'lodash.assign'
gutil = require 'gulp-util'

DEST = "./dest"
SRC = "./src"
paths =
  js: ["#{SRC}/**/*.coffee"]
  css: ["#{SRC}/**/*.styl", "!#{SRC}/**/spriteSp*.styl", "!#{SRC}/**/_**/*.styl"]
  img: ["#{SRC}/**/*.{png,jpg,gif}", "!#{SRC}/**/spriteSp/**/*.png"]
  reload: ["#{DEST}/**/*", "!#{DEST}/**/*.css"]

customOpts =
  entries: ["#{SRC}/js/main.coffee"]
  extensions: ['.coffee']
  debug: true
opts = assign {}, watchify.args, customOpts
b = watchify browserify(opts)
bundle = ->
  b.bundle()
    .on 'error',  gutil.log.bind gutil, 'Browserify Error'
    .pipe source './js/main.js'
    .pipe buffer()
    .pipe sourcemaps.init loadMaps: true
    .pipe sourcemaps.write './'
    .pipe gulp.dest DEST

gulp.task 'browserify', bundle
b.on 'update', bundle
b.on 'log', gutil.log

nib = require 'nib'
gulp.task 'stylus', ->
  gulp.src paths.css
    .pipe plumber()
    .pipe stylus use: nib(), errors: true
    .pipe gulp.dest DEST
    .pipe browserSync.reload stream: true


gulp.task 'browserSync', ->
  browserSync
    startPath: 'index.html'
    server: baseDir: DEST

gulp.task 'watch', ->
  gulp.watch paths.js, ['browserify']
  gulp.watch paths.css  , ['stylus']
  gulp.watch paths.reload, -> browserSync.reload once: true


gulp.task 'default', ['watch', 'browserSync']
gulp.task 'build', ['browserify', 'stylus']
