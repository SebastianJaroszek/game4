import 'phaser';

import Game from './game';

const config: Phaser.Types.Core.GameConfig = {
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
    scene: Game
};

new Phaser.Game(config);
