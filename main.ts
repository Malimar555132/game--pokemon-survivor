// TIE ENEMIES SPAWN TO SCORE
// by limiteing the number picker based on score
// at score 5 update it to allow more 
// at score 10 update it also
function Spawn_Enemy () {
    Random_enemy_chooser = randint(0, enemy_image.length - 1)
    enemy_pokemon = sprites.create(enemy_image[Random_enemy_chooser], SpriteKind.Enemy)
    tiles.placeOnRandomTile(enemy_pokemon, assets.tile`Tall Grass`)
    enemy_pokemon.follow(Squirtle, enemy_speed[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "Special", enemy_special[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "Cooldown", enemy_cooldown[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "HP", enemy_hp[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "NextShot", game.runtime() + enemy_cooldown[Random_enemy_chooser])
}
// Makes sure enempies not overlap eachother
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.x < otherSprite.x) {
        sprite.x += -4
        otherSprite.x += 4
    }
    if (sprite.y < otherSprite.y) {
        sprite.y += -4
        otherSprite.y += 4
    }
})
// This creates the parallel arrays
function Enemy_Templates (Img: Image, Speed: number, Special: number, Cooldown: number, HP: number) {
    enemy_image.push(Img)
    enemy_speed.push(Speed)
    enemy_special.push(Special)
    enemy_cooldown.push(Cooldown)
    enemy_hp.push(HP);
    [0].push(0)
}
function Water_Gun_attack () {
    Water_Gun = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 8 8 8 8 8 . . . . . . 
        . . . . . 8 9 9 9 8 . . . . . . 
        . . . . . 8 9 9 9 8 . . . . . . 
        . . . . . 8 9 9 9 8 . . . . . . 
        . . . . . 8 8 8 8 8 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    Water_Gun.setFlag(SpriteFlag.AutoDestroy, true)
    Water_Gun.setFlag(SpriteFlag.DestroyOnWall, true)
    Water_Gun.setPosition(Squirtle.x, Squirtle.y)
    spriteutils.setVelocityAtAngle(Water_Gun, spriteutils.angleFrom(Squirtle, Closest_Enemy[0]), 100)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "HP", -1)
    if (sprites.readDataNumber(otherSprite, "HP") == 0) {
        sprites.destroy(otherSprite, effects.fountain, 1000)
        info.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
let Closest_Enemy: Sprite[] = []
let Water_Gun: Sprite = null
let enemy_hp: number[] = []
let enemy_cooldown: number[] = []
let enemy_special: number[] = []
let enemy_speed: number[] = []
let enemy_pokemon: Sprite = null
let enemy_image: Image[] = []
let Random_enemy_chooser = 0
let Squirtle: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Squirtle = sprites.create(assets.image`squirtle art`, SpriteKind.Player)
scene.cameraFollowSprite(Squirtle)
controller.moveSprite(Squirtle)
Enemy_Templates(img`
    . . . . e e e e . . . . . . . . . . 
    . . . e 4 4 4 4 e . . . . . . 2 . . 
    . . e 4 4 4 4 4 4 e . . . . . 2 . . 
    . . e 4 4 4 4 4 4 e . . . . . 2 2 . 
    . e 4 e 4 4 4 4 4 4 e . . . 2 2 2 . 
    . e 4 e 1 4 4 4 4 4 e . . . 2 d 2 2 
    e 4 4 4 c 4 4 4 4 4 e . . . 2 d d 2 
    f 4 4 4 c 4 4 4 4 4 4 e . . . 2 d e 
    . f e 4 4 4 e e 4 4 4 e . . . e e f 
    . . e f f e e 4 e 4 4 4 e e e e e f 
    . . . . e e 4 4 e 4 4 4 4 4 e e f . 
    . . . . f f f f 4 4 4 4 e e e e f . 
    . . . . . e 4 e 4 4 e e e e f f . . 
    . . . . . e e e e e e e f f . . . . 
    . . . . . . e e e f e . . . . . . . 
    . . . . . . f f f . . . . . . . . . 
    `, 45, 0, 0, 1)
Enemy_Templates(img`
    . . . . . . . . . f f f f . . . . 
    . . . . . . . f f c c c f . . . . 
    . . . . . . f 5 e c c f . . . . . 
    . . . . c f 5 5 5 f f f f f . . . 
    . . e e 5 5 5 f f 5 e c c f . . . 
    . e 5 5 5 5 e 5 5 5 5 c f . . . . 
    e 5 5 5 5 5 5 5 5 5 f f . . . . . 
    e 5 5 5 5 5 5 5 e f c . . c c c f 
    c 5 5 1 5 5 5 5 5 5 e c . c 5 5 f 
    c 4 5 f 5 5 5 5 5 e e 4 c 5 5 5 f 
    . c 4 5 2 2 5 5 5 5 5 e c 5 5 5 f 
    . . f f 2 2 5 5 5 5 e e c 5 f c . 
    . . . . f f e 5 5 5 5 5 c e f . . 
    . . . . e e 5 5 5 5 5 5 e f f . . 
    . . . . . e e 5 5 5 5 c e f . . . 
    . . . . . f 5 5 e f e e f . . . . 
    . . . . . . f f e . . . . . . . . 
    `, 55, 1, 5, 2)
info.setLife(3)
info.setScore(0)
game.onUpdateInterval(1000, function () {
    Spawn_Enemy()
})
game.onUpdateInterval(500, function () {
    Closest_Enemy = spriteutils.getSpritesWithin(SpriteKind.Enemy, 75, Squirtle)
    Water_Gun_attack()
})
