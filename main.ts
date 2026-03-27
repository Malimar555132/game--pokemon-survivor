function Enemy_Template (Img: Image, Speed: number, Special: number, Cooldown: number, HP: number) {
    enemy_image.push(Img)
    enemy_speed.push(Speed)
    enemy_special.push(Special)
    enemy_cooldown.push(Cooldown)
    enemy_hp.push(HP)
}
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Spawn_Enemy()
})
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
    }
})
let Closest_Enemy: Sprite[] = []
let Water_Gun: Sprite = null
let enemy_pokemon: Sprite = null
let Random_enemy_chooser = 0
let enemy_hp: number[] = []
let enemy_cooldown: number[] = []
let enemy_special: number[] = []
let enemy_speed: number[] = []
let enemy_image: Image[] = []
let Squirtle: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Squirtle = sprites.create(assets.image`squirtle art`, SpriteKind.Player)
scene.cameraFollowSprite(Squirtle)
controller.moveSprite(Squirtle)
Enemy_Template(img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, 45, 0, 0, 1)
Enemy_Template(img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    `, 55, 1, 5, 2)
game.onUpdateInterval(500, function () {
    Closest_Enemy = spriteutils.getSpritesWithin(SpriteKind.Enemy, 75, Squirtle)
    Water_Gun_attack()
})
