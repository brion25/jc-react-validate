const plato = require('es6-plato')
const eslintConfig = require('./.eslintrc.json')

const src = './src/**/*.js'
const outputDir = './complexity'

const platoArgs = {
  title: 'example',
  eslint: eslintConfig
}

function callback(reports){
  let overview = plato.getOverviewReport(reports);

  let {
    total,
    average
  } = overview.summary;

  let output = `total
    ----------------------
    eslint: ${total.eslint}
    sloc: ${total.sloc}
    maintainability: ${total.maintainability}
    average
    ----------------------
    eslint: ${average.eslint}
    sloc: ${average.sloc}
    maintainability: ${average.maintainability}`;

  console.log(output);
}

plato.inspect(src, outputDir, platoArgs, callback)
