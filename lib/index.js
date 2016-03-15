'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processEnv = require('process-env');

var _processEnv2 = _interopRequireDefault(_processEnv);

var _fsExtraPromiseEs = require('fs-extra-promise-es6');

var _fsExtraPromiseEs2 = _interopRequireDefault(_fsExtraPromiseEs);

var _nodeGlobLoader = require('node-glob-loader');

var _nodeGlobLoader2 = _interopRequireDefault(_nodeGlobLoader);

var _nioTools = require('nio-tools');

var _nioTools2 = _interopRequireDefault(_nioTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var has = _nioTools2.default.has;
var is = _nioTools2.default.is;
var merge = _nioTools2.default.merge;


var load = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(glob) {
    var run;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            run = function run() {
              return new Promise(function (resolve) {
                var requires = null;
                _nodeGlobLoader2.default.load(glob, function (exports) {
                  requires = exports;
                }).then(function () {
                  resolve(requires);
                });
              });
            };

            _context.next = 3;
            return run();

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function load(_x) {
    return ref.apply(this, arguments);
  };
}();
var findDeveloperConfig = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, teamPath) {
    var config, developerFilePath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = null;

            if (!has(ctx, 'developer')) {
              _context2.next = 7;
              break;
            }

            if (!(ctx.developer != '')) {
              _context2.next = 7;
              break;
            }

            developerFilePath = teamPath + '/' + ctx.developer + '.js';
            _context2.next = 6;
            return load(developerFilePath);

          case 6:
            config = _context2.sent;

          case 7:
            return _context2.abrupt('return', config);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function findDeveloperConfig(_x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

var getNioContext = function getNioContext() {
  var teamPath = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];


  //console.log('getNioContext -> teamPath', teamPath)

  var mode = _processEnv2.default.get('NIO_MODE');
  var home = _processEnv2.default.get('NIO_HOME');
  var hangar = _processEnv2.default.get('HANGAR_PATH');
  var product = _processEnv2.default.get('PRODUCT_PATH');
  var shelter = _processEnv2.default.get('SHELTER_PATH');
  var cargo = _processEnv2.default.get('CARGO_PATH');
  var developer = _processEnv2.default.get('DEVELOPER').replace(/"/g, '');

  var hasDeveloper = !is(developer, 'zero-len');

  var developerConfig = null;

  if (teamPath != '' && hasDeveloper) {

    //TODO: make more elegant

    try {
      developerConfig = require(teamPath + '/' + developer);
    } catch (e) {}
  }

  return {
    mode: mode,
    paths: {
      home: home,
      hangar: hangar,
      product: product,
      shelter: shelter,
      cargo: cargo
    },
    developer: developer,
    developerConfig: developerConfig
  };
};

exports.default = {
  findDeveloperConfig: findDeveloperConfig,
  getNioContext: getNioContext

};
module.exports = exports['default'];