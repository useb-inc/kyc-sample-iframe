import gulp from 'gulp'
import clean from 'gulp-clean'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import importCss from 'gulp-import-css'
import stripDebug from 'gulp-strip-debug';

const BUILD_DIR = 'build';

const clean_task = () =>
  gulp.src(BUILD_DIR, { allowEmpty: true })
    .pipe(clean({ force: true }))

const js = async (src, dest,
  exec_babel = true,
  exec_uglify = false,
  exec_sourcemaps = true,
  exec_strip_debug = true) => {

  let result;
  result = await gulp.src(src);
  if (exec_sourcemaps) {
    result = await result.pipe(sourcemaps.init());
  }
  if (exec_strip_debug) {
    result = await result.pipe(stripDebug());
  }
  if (exec_babel) {
    result = await result.pipe(babel());
  }
  if (exec_uglify) {
    result = await result.pipe(uglify());
  }
  if (exec_sourcemaps) {
    result = await result.pipe(sourcemaps.write());
  }
  result = await result.pipe(gulp.dest(dest));

  return result;
}

const css = (src, dest) =>
  gulp
    .src(src)
    .pipe(importCss())
    .pipe(gulp.dest(dest))

const html = (src, dest) =>
  gulp
    .src(src)
    .pipe(gulp.dest(dest))

const res = (src, dest) =>
  gulp
    .src(src)
    .pipe(gulp.dest(dest))

const demo_js_build = () => js('src/**/*.js', BUILD_DIR);
const demo_css_build = () => css('src/css/demo.css', BUILD_DIR + '/' + '/css');
const demo_html_build = () => html('src/**/*.html', BUILD_DIR);
const demo_res_build = () => res('public/**/*', BUILD_DIR);

const demo_js_debug = () => js('src/**/*.js', BUILD_DIR, false, false, false, false);

export const build = gulp.series(
  clean_task,
  gulp.parallel(
    demo_js_build, demo_css_build, demo_html_build, demo_res_build
  ),
);

export const debug = gulp.series(
  clean_task,
  gulp.parallel(
    demo_js_debug, demo_css_build, demo_html_build, demo_res_build
  ),
);
