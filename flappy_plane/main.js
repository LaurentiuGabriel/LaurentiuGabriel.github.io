var mainState = {
 preload: function() { 
    // Load the plane sprite
	alert("Drive the plane through the obstacles. Use SPACEBAR key to navigate");
    game.load.image('plane', 'assets/plane.png'); 
    game.load.image('pipe', 'assets/pipe.png');
},

create: function() { 
    // Equivalent in RGB: rgb(113,197,207)
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // coordinates of plane: ox = 100, oy = 245
    this.plane = game.add.sprite(100, 245, 'plane');
    game.physics.arcade.enable(this.plane);
    this.plane.body.gravity.y = 1000;  
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);     
this.pipes = game.add.group(); 
this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
this.score = 0;
this.labelScore = game.add.text(20, 20, "0", 
    { font: "40px Impact", fill: "#ffffff" });  
},

update: function() {
    if (this.plane.y < 0 || this.plane.y > 490)
        this.restartGame();
        game.physics.arcade.overlap(
            this.plane, this.pipes, this.restartGame, null, this);
},

jump: function() {
    this.plane.body.velocity.y = -350;
},

restartGame: function() {
	alert("Plane Destroyed");
    game.state.start('main');
},
addOnePipe: function(x, y) {
    var pipe = game.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200; 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},
addRowOfPipes: function() {
    var hole = Math.floor(Math.random() * 5) + 1;
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(400, i * 60 + 10);   
            this.score += 1;
this.labelScore.text = this.score;  
},
};
var game = new Phaser.Game(400, 490);
game.state.add('main', mainState); 
game.state.start('main');