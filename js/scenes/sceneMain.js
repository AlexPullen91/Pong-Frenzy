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
        var mediaManager = new mediaManager({scene: this});

        var sb = new SoundButtons({scene: this});

        this.alignGrid = new AlignGrid({scene: this, rows: 5, cols: 5});
        //this.alignGrid.showNumbers(); // defines alignGrid class instance
        
        
    }
    
    update() {

    }
}