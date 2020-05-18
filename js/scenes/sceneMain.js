class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.spritesheet('balls', 'images/balls.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('paddles', 'images/paddles.png', { frameWidth: 400, frameHeight: 50 });
        this.load.image('bar', 'images/bar.jpg');
        
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var mediaManager = new MediaManager({scene: this});

        var sb = new SoundButtons({scene: this});
        
        // reference to dead center of the game
        this.velocity = 200;
        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;
        this.quarter = game.config.height / 4;
        this.pMove = game.config.height / 32; // amount the paddle is going to move every time
        //
        //
        this.bar = this.add.image(this.centerX, this.centerY, 'bar');
        this.bar.displayWidth = game.config.width / 3;
        this.bar.displayHeight = game.config.height;
        //
        //
        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        Align.scaleToGameW(this.ball, .05);
        //
        //
        this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, 'paddles');
        Align.scaleToGameW(this.paddle1, .25)
        this.pScale = this.paddle1.scaleX;
        //
        //
        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter * 3, 'paddles');
        Align.scaleToGameW(this.paddle2, .25)
        //
        //
        var scoreBox = new ScoreBox({scene: this});
        this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11});
        this.aGrid.placeAtIndex(5, scoreBox);
        //
        //
        this.setBallColor();
        this.ball.setVelocity(0, this.velocity);
        this.paddle1.setImmovable();
        this.paddle2.setImmovable();
        this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
        this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);
        this.input.on('pointerdown', this.changePaddle, this);
        this.input.on('pointerup', this.onUp, this);
    }
    onUp(pointer) {
        var diffY = Math.abs(pointer.y - this.downY);
        console.log(diffY);
        if (diffY > 300) {
            //move the paddles back
            this.tweens.add({targets: this.paddle1, duration: 1000, y: this.quarter});
            this.tweens.add({targets: this.paddle2, duration: 1000, y: this.quarter * 3});
        }
    }

    changePaddle(pointer) { // only change the color of the paddle that the ball is heading towards
        var paddle = (this.velocity > 0) ? this.paddle2 : this.paddle1;
        this.tweens.add({
            targets: paddle,
            duration: 500,
            scaleX: 0,
            onComplete:
            this.onCompleteHandler,
            onCompleteParams: [{scope: this, paddle: paddle}]
        });
        

        this.downY = pointer.y;
    }
    // flip animation for paddles when they change color
    onCompleteHandler (tween, targets, custom) { 
        var paddle = custom.paddle;
        paddle.scaleX = custom.scope.pScale;
        var color = (paddle.frame.name == 1) ? 0 : 1;
        paddle.setFrame(color);

    }

    setBallColor() { // chance for ball to change from white or black
        var r = Math.floor(Math.random() * 100);
        if (r < 50) {
            this.ball.setFrame(0);
        } else {
            this.ball.setFrame(1);
        }
    }
    doOver() {
        this.scene.start('SceneOver'); // game over screen
    }
    ballHit(ball, paddle) {
        this.velocity = -this.velocity;
        if (ball.frame.name == paddle.frame.name) { // detects if ball is hitting correct paddles
            console.log('points!');
        } else {
            this.time.addEvent({ delay: 1000, 
                callback: this.doOver, // game over
                callbackScope: this,
                loop: false
            });
            return;
        }

        this.setBallColor();
        ball.setVelocity(0, this.velocity);
        var targetY = 0;

        if (paddle.y > this.centerY) { // move paddles inwards
            targetY = paddle.y - this.pMove;
        } else {
            targetY = paddle.y + this.pMove;
        }
        this.tweens.add({targets: paddle, duration: 1000, y:targetY})
    }

    update() {

    }
}