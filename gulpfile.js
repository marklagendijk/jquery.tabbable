var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("minify", function(){
    gulp.src("jquery.tabbable.js")
        .pipe(uglify())
        .pipe(rename("jquery.tabbable.min.js"))
        .pipe(gulp.dest("./"));
});