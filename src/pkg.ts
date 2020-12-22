import path from 'path';
import fs from 'fs';

const pkgFile = path.resolve(__dirname, '../package.json');
const pkgJson = fs.readFileSync(pkgFile);
const pkg = JSON.parse(pkgJson.toString());

export const name = pkg.name;

export const version = pkg.version;

export const project = `${pkg.name}@${pkg.version}`;
