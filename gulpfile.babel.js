import gulp from 'gulp'
import clean from 'gulp-clean'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import importCss from 'gulp-import-css'
import stripDebug from 'gulp-strip-debug';
import fs from 'fs';
import dotenv from "dotenv";

const BUILD_DIR = 'build';
// const SDK_DIR = 'sdk';
const DEMO_DIR = 'demo';

const clean_task = () =>
  gulp.src(BUILD_DIR, { allowEmpty: true })
    .pipe(clean({ force: true }))


const __replace_file = (filePath, replacementList) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }

      let result = data;
      for (const replacement of replacementList) {
        result = result.replace(replacement["regex"], replacement["value"]);
      }

      fs.writeFile(filePath, result, 'utf8', function (err) {
        if (err) {
          console.log(err)
          reject(err);
        }
        resolve();
      });
    });
  });
};

const env_setting_kyc_demo = async () => {
  return new Promise(async (resolve, reject) => {

    dotenv.config({path: '.env'});

    const replacementListForKYCSettings = [
      {regex: /{{ENV_KYC_TARGET_ORIGIN}}/g, value: process.env.ENV_KYC_TARGET_ORIGIN},
      {regex: /{{ENV_KYC_URL}}/g, value: process.env.ENV_KYC_URL}
    ]
    const p1 = __replace_file("build/demo/js/kyc.js", replacementListForKYCSettings);

    const replacementListForJenkinsBuildNumber = [
      {regex: /{{ENV_JENKINS_BUILD_NUMBER}}/g, value: (process.env.BUILD_NUMBER || new Date().toISOString())}
    ];
    const p2 = __replace_file("build/demo/index.html", replacementListForJenkinsBuildNumber);
    const p3 = __replace_file("build/demo/test.html", replacementListForJenkinsBuildNumber);

    Promise.all([p1, p2, p3]).then(() => {
      resolve();
    }).catch((e) => {
      reject(e)
    });
  });
}

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


// const sdk_js_build = () => js(SDK_DIR + '/src/**/*.js', BUILD_DIR + '/' + SDK_DIR);
// const sdk_css_build = () => css(SDK_DIR + '/src/css/sdk.css', BUILD_DIR + '/' + SDK_DIR + '/css');
// const sdk_html_build = () => html(SDK_DIR + '/src/**/*.html', BUILD_DIR + '/' + SDK_DIR);
// const sdk_res_build = () => res(SDK_DIR + '/public/**/*', BUILD_DIR + '/' + SDK_DIR);

const demo_js_build = () => js(DEMO_DIR + '/src/**/*.js', BUILD_DIR + '/' + DEMO_DIR);
const demo_css_build = () => css(DEMO_DIR + '/src/css/demo.css', BUILD_DIR + '/' + DEMO_DIR + '/css');
const demo_html_build = () => html(DEMO_DIR + '/src/**/*.html', BUILD_DIR + '/' + DEMO_DIR);
const demo_res_build = () => res(DEMO_DIR + '/public/**/*', BUILD_DIR + '/' + DEMO_DIR);

// const sdk_js_debug = () => js(SDK_DIR + '/src/**/*.js', BUILD_DIR + '/' + SDK_DIR, false, false, false, false, true);
const demo_js_debug = () => js(DEMO_DIR + '/src/**/*.js', BUILD_DIR + '/' + DEMO_DIR, false, false, false, false, true);

// const sdk_js_dist = gulp.series(
//   () => js([SDK_DIR + '/src/**/*.js', `!${SDK_DIR}/src/useb-ocr-wasm-sdk.js`], BUILD_DIR + '/' + SDK_DIR),
//   () => gulp.src(`${SDK_DIR}/src/useb-ocr-wasm-sdk.js`).pipe(gulp.dest(BUILD_DIR + '/' + SDK_DIR))
// )

const demo_js_dist = gulp.series(
  () => js([DEMO_DIR + '/src/**/*.js', `!${DEMO_DIR}/src/demo.js`], BUILD_DIR + '/' + DEMO_DIR),
  () => gulp.src(`${DEMO_DIR}/src/demo.js`).pipe(gulp.dest(BUILD_DIR + '/' + DEMO_DIR))
)


export const build = gulp.series(
  clean_task,
  // gulp.parallel(
  //   sdk_js_build, sdk_css_build, sdk_html_build, sdk_res_build
  // ),
  gulp.parallel(
    demo_js_build, demo_css_build, demo_html_build, demo_res_build
  ),
  env_setting_kyc_demo,
);

export const debug = gulp.series(
  clean_task,
  // gulp.parallel(
  //   sdk_js_debug, sdk_css_build, sdk_html_build, sdk_res_build
  // ),
  gulp.parallel(
    demo_js_debug, demo_css_build, demo_html_build, demo_res_build
  ),
  env_setting_kyc_demo,
);

export const dist = gulp.series(
  clean_task,
  // gulp.parallel(
  //   sdk_js_dist, sdk_css_build, sdk_html_build, sdk_res_build
  // ),
  gulp.parallel(
    demo_js_dist, demo_css_build, demo_html_build, demo_res_build
  ),
  env_setting_kyc_demo,
);