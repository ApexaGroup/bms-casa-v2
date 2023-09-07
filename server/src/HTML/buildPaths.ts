// const path = require('path');
// Flag is here
import path from "path"
const buildPaths = {
    buildPathHtml: path.resolve('./build.html'),
    buildPathPdf: path.resolve('./build.pdf')
    // buildPathPdf: path.resolve('./build.pdf')
};
const buildExtraPaths = {
    buildPathHtml: path.resolve('./extra.html'),
    buildPathPdf: path.resolve('./extra.pdf')
    // buildPathPdf: path.resolve('./build.pdf')
};

const BuildPath = {
    buildPaths,
    buildExtraPaths
}

export { BuildPath }