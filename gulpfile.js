const { src, dest, watch, series } = require("gulp");
const minifyCSS = require("gulp-clean-css");
const minifyJS = require("gulp-uglify");
const concat = require("gulp-concat");

const bundleCSS = () => {
  return src(["./css/**/main.css", "./css/**/!(main).css"])
    .pipe(minifyCSS())
    .pipe(concat("arshfa.min.css"))
    .pipe(dest("./dist"));
};

const bundleJS = () => {
  return src([
    "./js/**/lockWebsite.js",
    "./js/**/functions.js",
    "./js/**/observer.js",
  ])
    .pipe(minifyJS())
    .pipe(concat("arshfa.min.js"))
    .pipe(dest("./dist"));
};

const Watch = () => {
  watch("./css/**/**.css", bundleCSS);
  watch("./js/**/**.js", bundleJS);
};

exports.default = series(bundleCSS, bundleJS, Watch);
