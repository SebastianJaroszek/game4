webpackJsonp([0],{

/***/ 1407:
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }

  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game =
/** @class */
function (_super) {
  __extends(Game, _super);

  function Game() {
    var _this = _super.call(this, {
      key: 'Game'
    }) || this;

    _this.speed = 100;
    _this.count = 0;
    _this.score = 0;
    _this.bestScore = 0;
    _this.labels = {
      labelName: null,
      labelTuto: null,
      labelBest: null,
      labelScore: null
    };
    _this.status = {
      coinTaking: false,
      menuScene: true,
      isMoving: false,
      moving: {
        down: false,
        up: false,
        left: false,
        right: false
      }
    };
    _this.sounds = {
      coinSound: null,
      moveSound: null,
      hitSound: null,
      music: null
    };
    return _this;
  }

  Game.prototype.preload = function () {
    this.load.audio('coin', 'assets/coin.mp3');
    this.load.audio('move', 'assets/move.mp3');
    this.load.audio('hit', 'assets/hit.mp3');
    this.load.audio('music', 'assets/music.ogg');
    this.load.image('square', 'assets/square.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('particle', 'assets/particle.png');
    this.load.image('particle2', 'assets/particle2.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('map', 'assets/map2.png');
  };

  Game.prototype.create = function () {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.nextEnemy = this.time.now;
    this.arrow = this.input.keyboard.createCursorKeys();
    this.initLevel();
    this.initSounds();
  };

  Game.prototype.update = function (timestep, delta) {
    this.physics.overlap(this.square, this.coin, this.takeCoin.bind(this));
    this.movePlayer();
  };

  Game.prototype.takeCoin = function () {
    this.add.tween({
      targets: [this.coin],
      scaleY: 0,
      scaleX: 0,
      duration: 100
    });
  };

  Game.prototype.initLevel = function () {
    this.coin = this.physics.add.sprite(this.width / 2 + 8 * 8, this.height / 2 - 8 * 8, 'coin');
    this.map = this.physics.add.sprite(this.width / 2, this.height / 2, 'map');
    this.square = this.physics.add.sprite(this.width / 2 - 8 * 8, this.height / 2 + 8 * 8, 'square');
  };

  Game.prototype.initSounds = function () {
    this.sounds.moveSound = this.sound.add('move');
    this.sounds.moveSound.volume = 0.05;
    this.sounds.music = this.sound.add('music');
    this.sounds.music.volume = 0.05;
    this.sounds.music.play();
  };

  Game.prototype.movePlayer = function () {
    if (this.status.isMoving) {
      return;
    }

    this.commandMove('up', this.arrow.up);
    this.commandMove('down', this.arrow.down);
    this.commandMove('left', this.arrow.left);
    this.commandMove('right', this.arrow.right);
  };

  Game.prototype.commandMove = function (way, command) {
    if (command.isDown && !this.status.moving[way]) {
      this.status.moving[way] = true;
      this.move(way);
    } else if (command.isUp) {
      this.status.moving[way] = false;
    }
  };

  Game.prototype.move = function (way) {
    var t = this.tweens.createTimeline({}),
        config = {
      targets: [this.square],
      duration: this.speed
    };
    this.status.isMoving = true;

    if (way === 'up') {
      if (Math.ceil(this.square.y) > this.height / 2 - 8 * 8) {
        t.add(__assign({}, config, {
          y: this.square.y - this.square.height - 24
        }));
      } else {
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          y: this.square.y - this.square.height / 3
        }));
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          y: this.square.y
        }));
      }
    }

    if (way === 'down') {
      if (Math.ceil(this.square.y) < this.height / 2 + 8 * 8) {
        t.add(__assign({}, config, {
          y: this.square.y + this.square.height + 24
        }));
      } else {
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          y: this.square.y + this.square.height / 3
        }));
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          y: this.square.y
        }));
      }
    }

    if (way === 'left') {
      if (Math.ceil(this.square.x) > this.height / 2 - 8 * 8) {
        t.add(__assign({}, config, {
          x: this.square.x - this.square.width - 24
        }));
      } else {
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          x: this.square.x - this.square.width / 3
        }));
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          x: this.square.x
        }));
      }
    }

    if (way === 'right') {
      if (Math.ceil(this.square.x) < this.height / 2 + 8 * 8) {
        t.add(__assign({}, config, {
          x: this.square.x + this.square.width + 24
        }));
      } else {
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          x: this.square.x + this.square.width / 3
        }));
        t.add(__assign({}, config, {
          duration: this.speed / 2,
          x: this.square.x
        }));
      }
    }

    this.sounds.moveSound.play();
    t.play();
    t.add({
      targets: [this.square],
      onComplete: this.moveOver.bind(this)
    });
  };

  Game.prototype.moveOver = function () {
    this.status.isMoving = false;
  };

  return Game;
}(Phaser.Scene);

exports.default = Game;

/***/ }),

/***/ 516:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sebastian/workspace/workshops/20190719/start_game_4/src/main.ts */517);


/***/ }),

/***/ 517:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! phaser */ 245);

var game_1 = __importDefault(__webpack_require__(/*! ./game */ 1407));

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  width: 500,
  height: 500,
  resolution: 1,
  backgroundColor: "#9b59b6",
  scene: game_1.default
};
new Phaser.Game(config);

/***/ })

},[516]);
//# sourceMappingURL=bundle.js.map