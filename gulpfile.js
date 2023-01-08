const { src, dest, watch, series } = require("gulp");
const minifyCSS = require("gulp-clean-css");
const sourceMap = require("gulp-sourcemaps");
const concat = require("gulp-concat");

const bundleCSS = () => {
  return src("./css/**/!(main).css")
    .pipe(sourceMap.init())
    .pipe(minifyCSS())
    .pipe(concat("bundle.min.css"))
    .pipe(sourceMap.write())
    .pipe(dest("./dist"));
};

const Watch = () => {
  watch("./css/**/!(main).css", bundleCSS);
};

exports.default = series(bundleCSS, Watch);
