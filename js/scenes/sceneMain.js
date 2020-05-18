class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.spritesheet('balls', 'images/balls.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('paddles', 'images/paddles.png', { frameWidth: 400, frameHeight: 50 });
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var mediaManager = new MediaManager({scene: this});

        var sb = new SoundButtons({scene: this});
        
        // reference to dead center of the game
        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;
        this.quarter = game.config.height / 4;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        Align.scaleToGameW(this.ball, .05);
        //
        //
        //
        this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, 'paddles');
        Align.scaleToGameW(this.paddle1, .25)
        //
        //
        //
        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter * 3, 'paddles');
        Align.scaleToGameW(this.paddle2, .25)

        //this.alignGrid = new AlignGrid({scene: this, rows: 5, cols: 5});
        //this.alignGrid.showNumbers(); // defines alignGrid class instance
        
        
    }
    
    update() {

    }
}