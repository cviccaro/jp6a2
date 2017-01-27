import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as fs from 'fs';
import * as path from 'path';
import Config from '../../config';
import { clean } from '../../utils';
import * as merge from 'merge-stream';

const join = path.join;

const publicPath = join(Config.PROJECT_ROOT, Config.OUTPUT_FOLDER);

function cleanPublic() {
	if (!fs.existsSync(publicPath)) {
		fs.mkdirSync(publicPath);
	}

	return clean(publicPath);
};

function copyHtAccess() {
	cleanPublic();

	return gulp.src(join(Config.PROJECT_ROOT, Config.APP_DEST, '.htaccess'))
	  .pipe(gulp.dest(publicPath));
}

function copyPublic() {
	return gulp.src(join(Config.PROJECT_ROOT, Config.APP_DEST, '**'))
	  .pipe(gulp.dest(publicPath));
}

export = () => {
	return merge(copyHtAccess(), copyPublic());
};