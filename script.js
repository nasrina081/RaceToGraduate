// Race to Graduate by Nasrin Ali
/* global Phaser by */

const config = {
  type: Phaser.AUTO,

  // This sets up the width, height, and background color of our phaser game.
  // (Optional): Play around with different width and height values.
  width: 900,
  height: 800,
  // (Optional): Pick a different background color from this website:
  // https://www.google.com/search?q=color+picker
  backgroundColor: "#ff9900",

  // This configures our physics environment so that we can have things like
  // gravity and collision.
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }, // Direction and strength of gravity
      debug: false // change to true to see object boxes and speed vectors
    }
  },

  // Add scene to call our functions
  scene: [
    // main scene
    { preload: preload, create: create, update: update },
    // you graduated scene
    { preload: preload, create: outroCreate, update: outroUpdate },
    // intro scene - it will start first
    { preload: preload, create: introCreate, update: introUpdate }
  ]
};

/**
 * Load assets here before the game starts.
 */
function preload() {
  this.load.image(
    "sky",
    "https://cdn.glitch.com/74863376-d3cc-4dfa-a295-64d3c3a0e322%2F6F5DDEB5-518D-45E9-AABF-537BA5938C73.jpeg?v=1621459164172"
  );

  // Load an image for the book (star.png)
  this.load.image(
    "star",
    "https://cdn.glitch.com/74863376-d3cc-4dfa-a295-64d3c3a0e322%2F11C6CC02-2542-4A0C-940E-37EFD91D253A.png?v=162203624007e"
  );

  // load an image for the good grade
  this.load.image(
    "paper",
    "https://cdn.glitch.com/74863376-d3cc-4dfa-a295-64d3c3a0e322%2Fa.jpg?v=1622046320531"
  );

  // load an intro scene image

  this.load.image(
    "grad",
    "https://cdn.glitch.com/74863376-d3cc-4dfa-a295-64d3c3a0e322%2FAD7B1001-51F9-474B-AC8B-F3CC5C812385.png?v=1622040157035"
  );

  //load outro image (game won)

  this.load.image(
    "congrats",
    "https://cdn.glitch.com/74863376-d3cc-4dfa-a295-64d3c3a0e322%2FDD2A872B-7FD9-4523-A8E2-5A88AE27EF71.png?v=1623520450527"
  );

  // Load an image for the ground (platform.png)
  this.load.image(
    "ground",
    "https://cdn.glitch.com/bebbb0e0-7fbf-4af0-8bc5-a032db8e43a0%2Fplatform.png?v=1609365051569"
  );

  this.load.spritesheet(
    "dude",
    "https://cdn.glitch.com/bebbb0e0-7fbf-4af0-8bc5-a032db8e43a0%2Fdude.png?v=1609365055413",
    {
      frameWidth: 32, // character width within the larger image
      frameHeight: 48 // character height
    }
  );

  // Step 2: Load scene images
  // When the player and bombs collide, call some function
  this.load.image(
    "bomb",
    "https://cdn.glitch.com/74863376-d3cc-4dfa-a295-64d3c3a0e322%2F7B7E86EA-B3B2-4AB8-9164-FD7C734A6535.png?v=1622036634712"
  );
  // Step 6: Load the player (dude) image
} // end of preload() function

// Global variables outside of any of the functions below:
// Step 4: Add the "platforms" global variable.
var platforms; // group of platform images
// Step 7: Add the "player" variable.
var player; // player sprite
// Step 2: Add cursors variable
var cursors;
// Step 7: Add stars variable
var stars; // group of stars
var papers; // group of good grades
// Step 11: Add score count and text variables
// Add score count and text - GLOBAL
var score = 0;
var scoreText;
// Step 13: Add bomb variable
var bombs;

// Step 15: Add game over variable
var gameOver = false;
var gameWon;

// intro scene

function introCreate() {
  // customize your intro scene with text and images
  this.add.text(200, 100, "Race To Graduate!", {
    font: "70px Brush Script MT",
    fill: "black"
  });
  this.add.text(320, 600, "press any key to continue", {
    fill: "black"
  });

  this.add.image(450, 450, "grad").setScale(2);
  // when any key is pressed...
  this.input.keyboard.on(
    "keydown",
    function() {
      // this function will be called.

      // switch to the main scene
      this.scene.stop(this.scene.manager.scenes[2]);
      this.scene.run(this.scene.manager.scenes[0]);
    },
    this
  );
}

// you won the game scene

function outroCreate() {
  // customize your intro scene with text and images
  if (gameWon) {
    this.add.text(100, 100, "Congratulations, you graduated!", {
      font: "70px Brush Script MT",
      fill: "black"
    });
    this.add.image(450, 450, "congrats");
  } else {
    this.add.text(300, 100, "Better luck next time!");
  }

  // in 3 seconds
  this.time.delayedCall(
    3000,
    function() {
      this.add.text(300, 300, "press any key to play again");
      // when any key is pressed...
      this.input.keyboard.on(
        "keydown",
        function() {
          // reset game state
          score = 0;
          gameOver = false;
          // switch to the main scene
          this.scene.stop(this.scene.manager.scenes[1]);
          this.scene.run(this.scene.manager.scenes[0]);
        },
        this
      );
    },
    [],
    this
  );
}

function introUpdate() {
  // this function is just like update() but for the intro scene.
}

function outroUpdate() {
  // this function is just like update() but for the intro scene.
}

/**
 * Create the level and characters. This function only runs once.
 */
function create() {
  // (Optional): Try changing some of the parameters. Can you make the text yellow?

  // Step 3: Add scene images
  this.add.image(400, 300, "sky"); // place sky center on x: 400, y: 300

  // Step 5: Generate platforms in the scene
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 770, "ground")
    .setScale(2) // make it twice as large (both x and y dimensions)
    .refreshBody(); // update “hitbox” to new size

  platforms.create(300, 250, "ground");

  platforms.create(750, 785, "ground");
  platforms.create(750, 754, "ground");
  platforms.create(400, 600, "ground");
  platforms.create(5, 400, "ground");
  platforms.create(900, 360, "ground");
  platforms.create(950, 150, "ground");
  platforms.create(400, 250, "ground");

  // Step 8: Add the player sprite
  player = this.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  // Step 9: Define movement animat ions
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20
  });

  // Test animations, remove this line later
  player.anims.play("left", true);

  // Step 1: Add gravity to the player
  player.body.setGravityY(100);

  // Step 1: Add player / platform collision
  this.physics.add.collider(player, platforms);

  // Step 2: Create cursor keys
  cursors = this.input.keyboard.createCursorKeys();

  // Step 7: Add stars to the scene
  stars = this.physics.add.group({
    key: "star", // use star image
    repeat: 6, // repeat it 11 more times
    setXY: { x: 25, y: 0, stepX: 110 } // start at x:12 and increment it by 70
  });

  // Step 8: Add star / platform collision
  this.physics.add.collider(stars, platforms);

  // Step 9: Customize the stars (add some bounce!)
  // Give the stars some bounce
  stars.children.iterate(function(star) {
    // set elasticity to a random number between 0.4 and 0.8
    star.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
  });

  // Step 10: Add star / player overlap
  // Whenever a player overlaps with a star, call our `collectStar` callback.
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // add good grades to the scene
  papers = this.physics.add.group({
    key: "paper", // use paper image
    repeat: 5, // repeat it 11 more times
    setXY: { x: 30, y: 0, stepX: 150 } // start at x:12 and increment it by 70
  });

  // add paper collision form
  this.physics.add.collider(papers, platforms);

  // Give the papers some bounce
  papers.children.iterate(function(paper) {
    // set elasticity to a random number between 0.4 and 0.8
    paper.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
  });

  // Step 10: Add paper / player overlap
  // Whenever a player overlaps with a star, call our `collectStar` callback.
  this.physics.add.overlap(player, papers, collectPaper, null, this);

  // Step 11: Display score text
  // Add to create()
  // Initialize the score text to a default and display it
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "white"
  });

  // Step 13: Add bomb / platform collision
  // Add a bombs group to store the bombs and have them collide with
  // the platforms
  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  // Step 14: Add bomb / player collision
  // When the player and bombs collide, call some function
  this.physics.add.collider(player, bombs, hitBomb, null, this);
} // end of create() function

function update() {
  // This runs many times per second.
  // Step 15: Add game over check
  // If the player has been hit by the bomb, make it so nothing else happens
  if (gameOver) {
    return;
  }

  // Step 2: Add keyboard event handling (left & right animations)
  // --------------------------
  // When left is pressed (down), play "left" animation
  if (cursors.left.isDown) {
    player.anims.play("left", true);

    // TODO(Step: 3) - Set velocity
    player.setVelocityX(-160);
  }

  // When right is pressed, play "right" animation
  else if (cursors.right.isDown) {
    player.anims.play("right", true);

    // TODO(Step: 3) - Set velocity
    player.setVelocityX(160);
  }

  // When nothing is pressed, play "turn" animation
  else {
    player.anims.play("turn");

    // TODO(Step: 3) - Set velocity
    player.setVelocityX(0);
  }

  // Step 5: Add keyboard event handling (jumping)
  // If up is pressed, move up
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-550);
  }
} // end of update() function

// add somewhere above "function collectStar(player, star)"

function collectItem(item, items, context) {
  // Remove the item from view
  item.disableBody(true, true);

  // When you collect an item, add to the score and display
  score += 20;
  scoreText.setText("Score: " + score);

  // *** check for game win here
  // Game win condition
  if (score > 200) {
    // switch to outro scene
    gameOver = true;
    gameWon = true;
    context.scene.stop(context.scene.manager.scenes[0]);
    context.scene.run(context.scene.manager.scenes[1]);
  }

  // When all items are collected
  if (items.countActive(true) == 0) {
    // add items back in
    items.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}

// Custom event functions below:
// Step 10: Add collectStar event function
// Create a callback function that will be called whenever player touches a star

function collectStar(player, star) {
  collectItem(star, stars, this);
}
// Custom event functions below:
// Step 10: Add collectPaper event function
// Create a callback function that will be called whenever player touches a paper
function collectPaper(player, paper) {
  collectItem(paper, papers, this);

  if (papers.countActive(true) % 2 == 0) {
    // Add a bomb somewhere between 0 and 800 on the x axis and at 16 on the y axis
    var x = Phaser.Math.Between(0, 800);
    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}

// Step 14: Add hitBomb event function
// When the player is hit by the bomb, freeze them and end the game
function hitBomb() {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("turn");
  // End the game when the player is hit by the bomb
  gameOver = true;
  gameWon = false;
  this.scene.stop(this.scene.manager.scenes[0]);
  this.scene.run(this.scene.manager.scenes[1]);
}

// Start the game engine
const game = new Phaser.Game(config);
