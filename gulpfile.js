import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import {deleteAsync as del} from 'del';
import browser from 'browser-sync';


// Styles

export const styles = () => {
  return gulp.src('docs/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

export const html = () => {
  return gulp.src('docs/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'))
}

// Scripts

export const scripts = () => {
  return gulp.src('docs/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

// Images

export const optimizeImages = () => {
  return gulp.src('docs/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

export const copyImages = () => {
  return gulp.src('docs/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

// WebP

export const turnToWebp = () => {
  return gulp.src('docs/img/**/*.{jpg,png}')
  .pipe(squoosh(
    {webp: {}}
  ))
  .pipe(gulp.dest('build/img'))
}

// SVG

export const svg = () =>
gulp.src(['docs/img/**/*.svg', '!docs/img/icons/*.svg'])
.pipe(svgo())
.pipe(gulp.dest('build/img'));

export const sprite = () => {
  return gulp.src('docs/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore())
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}

// Copy fonts and favicon

export const fonts = (done) => {
  gulp.src([
    'docs/fonts/*.{woff2,woff}',
    'docs/*.ico',
    'docs/img/favicons/*.json',
    'docs/*.webmanifest',
  ], {
    base: 'docs'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Cleanup

const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('docs/less/**/*.less', gulp.series(styles));
  gulp.watch('docs/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  fonts,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    turnToWebp,
  )
)

// Default

export default gulp.series(
  clean,
  fonts,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    turnToWebp,
  ),
  gulp.series(
    server,
    watcher
  ));
