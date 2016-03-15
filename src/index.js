import env from 'process-env'
import fse from 'fs-extra-promise-es6'
import loader from 'node-glob-loader'
import tools from 'nio-tools'
const { has, is, merge } = tools

const load = async function (glob) {

  let run = function () {
    return new Promise(function (resolve) {
      let requires = null
      loader.load(glob, function (exports) {
        requires = exports
      }).then(function () {
        resolve(requires)
      })
    })
  }

  return await run()

}
let findDeveloperConfig = async function (ctx, teamPath) {
  let config = null
  if (has(ctx, 'developer')) {
    if (ctx.developer != '') {

      let developerFilePath = `${teamPath}/${ctx.developer}.js`
      config = await load(developerFilePath)

    }
  }

  return config
}

const getNioContext = function (teamPath = '') {

  //console.log('getNioContext -> teamPath', teamPath)

  const mode = env.get('NIO_MODE')
  const home = env.get('NIO_HOME')
  const hangar = env.get('HANGAR_PATH')
  const product = env.get('PRODUCT_PATH')
  const shelter = env.get('SHELTER_PATH')
  const cargo = env.get('CARGO_PATH')
  let developer = env.get('DEVELOPER').replace(/"/g, '')

  let hasDeveloper = !is(developer, 'zero-len')

  let developerConfig = null

  if (teamPath != '' && hasDeveloper) {

    //TODO: make more elegant

    try {
      developerConfig = require(`${teamPath}/${developer}`)
    } catch (e) {
    }

  }

  return {
    mode,
    paths: {
      home,
      hangar,
      product,
      shelter,
      cargo,
    },
    developer,
    developerConfig,
  }


}

export default {
  findDeveloperConfig,
  getNioContext,

}
