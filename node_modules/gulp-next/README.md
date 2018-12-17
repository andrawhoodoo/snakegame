#  gulp-next
## 安装
```
npm install --save-dev gulp-next
```
## 参数
callback: 接受一个回调函数作为参数，函数有一个参数，返回当前正在处理的文件数组
## 例子
```Javascript
var gulp = require('gulp');
var next= require('gulp-next');

gulp.task('test', function () {
  gulp.src('images/*.png')
      .pipe(gulp.dest('path/output/'))
      .pipe(next(function(fileList){
          console.dir(fileList);
          console.log('success...');
      }));
});
```
