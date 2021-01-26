import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('./server/common/swagger/swagger.json', `${outDir}/common/swagger/swagger.json`)
