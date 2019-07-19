class Game extends Phaser.Scene {
    coin: Phaser.Physics.Arcade.Sprite;
    map: Phaser.Physics.Arcade.Sprite;
    square: Phaser.Physics.Arcade.Sprite;

    enemies: Phaser.Physics.Arcade.Group;

    arrow: Phaser.Types.Input.Keyboard.CursorKeys;

    speed: number = 100;
    count: number = 0;
    score: number = 0;
    bestScore: number = 0;

    nextEnemy: number;

    width: number;
    height: number;

    labels: { [key: string]: Phaser.GameObjects.Text } = {
        labelName: null,
        labelTuto: null,
        labelBest: null,
        labelScore: null
    };

    status: any = {
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

    sounds: any = {
        coinSound: null,
        moveSound: null,
        hitSound: null,
        music: null
    };

    emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    emitter2: Phaser.GameObjects.Particles.ParticleEmitter;
    particles: any;
    particles2: any;

    constructor() {
        super({
            key: 'Game'
        });
    }

    preload(): void {
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
    }

    create(): void {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.nextEnemy = this.time.now;

        this.arrow = this.input.keyboard.createCursorKeys();

        this.initLevel();
        this.initSounds();
    }

    update(timestep: number, delta: number): void {
        this.physics.overlap(this.square, this.coin, this.takeCoin.bind(this));

        this.movePlayer();
    }

    private takeCoin(): void {
        this.add.tween({
            targets: [this.coin],
            scaleY: 0,
            scaleX: 0,
            duration: 100
        });
    }

    private initLevel(): void {
        this.coin = this.physics.add.sprite(this.width / 2 + 8 * 8, this.height / 2 - 8 * 8, 'coin');
        this.map = this.physics.add.sprite(this.width / 2, this.height / 2, 'map');
        this.square = this.physics.add.sprite(this.width / 2 - 8 * 8, this.height / 2 + 8 * 8, 'square');
    }

    private initSounds(): void {
        this.sounds.moveSound = this.sound.add('move');
        this.sounds.moveSound.volume = 0.05;

        this.sounds.music = this.sound.add('music');
        this.sounds.music.volume = 0.05;
        this.sounds.music.play();
    }

    private movePlayer(): void {
        if (this.status.isMoving) {
            return;
        }
        this.commandMove('up', this.arrow.up);
        this.commandMove('down', this.arrow.down);
        this.commandMove('left', this.arrow.left);
        this.commandMove('right', this.arrow.right);
    }

    private commandMove(way: string, command: Phaser.Input.Keyboard.Key): void {
        if (command.isDown && !this.status.moving[way]) {
            this.status.moving[way] = true;
            this.move(way);
        } else if (command.isUp) {
            this.status.moving[way] = false;
        }
    }

    private move(way: string): void {
        let t: Phaser.Tweens.Timeline = this.tweens.createTimeline({}),
            config: any = {targets: [this.square], duration: this.speed};

        this.status.isMoving = true;

        if (way === 'up') {
            if (Math.ceil(this.square.y) > this.height / 2 - 8 * 8) {
                t.add({
                    ...config,
                    y: this.square.y - this.square.height - 24
                });
            } else {
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    y: this.square.y - this.square.height / 3
                });
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    y: this.square.y
                });
            }
        }

        if (way === 'down') {
            if (Math.ceil(this.square.y) < this.height / 2 + 8 * 8) {
                t.add({
                    ...config,
                    y: this.square.y + this.square.height + 24
                });
            } else {
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    y: this.square.y + this.square.height / 3
                });
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    y: this.square.y
                });
            }
        }

        if (way === 'left') {
            if (Math.ceil(this.square.x) > this.height / 2 - 8 * 8) {
                t.add({
                    ...config,
                    x: this.square.x - this.square.width - 24
                });
            } else {
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    x: this.square.x - this.square.width/ 3
                });
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    x: this.square.x
                });
            }
        }

        if (way === 'right') {
            if (Math.ceil(this.square.x) < this.height / 2 + 8 * 8) {
                t.add({
                    ...config,
                    x: this.square.x + this.square.width + 24
                });
            } else {
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    x: this.square.x + this.square.width/ 3
                });
                t.add({
                    ...config,
                    duration: this.speed / 2,
                    x: this.square.x
                });
            }
        }

        this.sounds.moveSound.play();

        t.play();

        t.add({
            targets: [this.square],
            onComplete: this.moveOver.bind(this)
        })

    }

    private moveOver(): void {
        this.status.isMoving = false;
    }

}

export default Game;
