namespace SpriteKind {
    export const basic_projectile = SpriteKind.create()
    export const Enemy_projectile = SpriteKind.create()
}
namespace StatusBarKind {
    export const experience = StatusBarKind.create()
}
function Spawn_Enemy () {
    Random_enemy_chooser = randint(0, Math.min(evolution_tracker, enemy_image.length - 1))
    enemy_pokemon = sprites.create(enemy_image[Random_enemy_chooser], SpriteKind.Enemy)
    tiles.placeOnRandomTile(enemy_pokemon, assets.tile`Tall Grass`)
    enemy_pokemon.follow(Squirtle, enemy_speed[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "Special", enemy_special[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "Cooldown", enemy_cooldown[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "HP", enemy_hp[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "NextShot", game.runtime() + enemy_cooldown[Random_enemy_chooser])
    sprites.setDataNumber(enemy_pokemon, "XP", enemy_xp[Random_enemy_chooser])
}
function Enemy_Attack () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value, "Special") == 2) {
            if (game.runtime() >= sprites.readDataNumber(value, "NextShot")) {
                Lightning = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . 4 5 4 5 5 . . . . . . 
                    . . . . . 5 5 5 4 5 . . . . . . 
                    . . . . . 5 4 5 5 4 . . . . . . 
                    . . . . . 4 5 5 5 5 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Enemy_projectile)
                Lightning.setFlag(SpriteFlag.AutoDestroy, true)
                Lightning.setFlag(SpriteFlag.DestroyOnWall, true)
                Lightning.setPosition(value.x, value.y)
                spriteutils.setVelocityAtAngle(Lightning, spriteutils.angleFrom(value, Squirtle), 80)
                sprites.setDataNumber(value, "NextShot", game.runtime() + sprites.readDataNumber(value, "Cooldown"))
            }
        }
    }
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy_projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
statusbars.onStatusReached(StatusBarKind.experience, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    level_up_tracker += 1
    level_up_bar.value = 0
    if (level_up_tracker == 5) {
        Squirtle.setImage(assets.image`warturtle`)
        evolution_tracker += 1
        scene.cameraShake(6, 1000)
        achievements.create("Squirtle evolved into Wartutrle", 1, "Evolution Tiime!", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            c c . . . . . . . . . . . c c . 
            b 1 c c . . c c c . . c c 1 b c 
            b b 1 b c c 9 9 9 c c b 1 b b c 
            c b b 1 6 9 9 9 9 9 6 1 b b c . 
            c b b 1 9 9 9 9 9 9 9 1 b b c . 
            . c b 6 9 9 9 9 9 9 9 6 b c 1 c 
            . . c 9 9 6 9 9 9 6 9 9 c 1 1 1 
            . . c 1 f 9 9 9 9 9 f 1 c b b 1 
            . . f b e 9 9 9 9 9 e b f 1 b 1 
            . . c f 6 9 6 9 6 9 6 f b b 1 c 
            . c 9 9 f c 6 6 6 c f 6 c c b f 
            . c 1 9 6 6 f f f 6 6 9 9 c f . 
            `)
    } else if (level_up_tracker == 10) {
        Squirtle.setImage(assets.image`blastoise`)
        evolution_tracker += 1
        scene.cameraShake(6, 1000)
        achievements.create("Warturtle evolved into Blastoise", 1, "Evolution x2", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . c c c c c c . . . . . . 
            . c c c 8 8 8 8 8 8 c c c . . . 
            . 8 8 8 c 8 8 8 8 c 8 8 8 c . . 
            . c 8 8 8 8 8 8 8 8 8 8 c c . . 
            . f 8 8 8 8 8 8 8 8 8 8 f c . . 
            . c 8 8 8 8 8 8 8 8 8 8 c f . . 
            . c c 8 8 8 8 8 8 8 8 c c f . . 
            . c 1 e 8 c 8 8 c 8 e 1 c f . . 
            . c 1 e f c 8 8 c f e 1 c c . . 
            . f c c c 8 8 8 8 c c c f c . . 
            . f d c c 8 8 8 8 c c d f 8 . . 
            . 1 f d d f c c f d d f 1 8 . . 
            . 1 e f f d d d d f f e 1 c . . 
            . d d d d f f f f d d d d f . . 
            `)
    }
})
// This creates the parallel arrays
function Enemy_Templates (Img: Image, Speed: number, Special: number, Cooldown: number, HP: number, XP: number) {
    enemy_image.push(Img)
    enemy_speed.push(Speed)
    enemy_special.push(Special)
    enemy_cooldown.push(Cooldown)
    enemy_hp.push(HP)
    enemy_xp.push(XP)
}
sprites.onOverlap(SpriteKind.basic_projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "HP", -1)
    if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
        sprites.destroy(otherSprite, effects.fountain, 1000)
        info.changeScoreBy(sprites.readDataNumber(otherSprite, "XP"))
        level_up_bar.value += sprites.readDataNumber(otherSprite, "XP")
    }
})
function piercing_bubbles () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . b b b b b b . . . . . 
        . . . b b 9 9 9 9 9 9 b b . . . 
        . . b b 9 9 9 9 9 9 9 9 b b . . 
        . b b 9 d 9 9 9 9 9 9 9 9 b b . 
        . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
        b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
        b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
        b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
        b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
        . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
        . b d 5 3 3 3 3 3 3 3 d 5 b b . 
        . . b d 5 d 3 3 3 3 5 5 b b . . 
        . . . b b 5 5 5 5 5 5 b b . . . 
        . . . . . b b b b b b . . . . . 
        `, Squirtle, 50, 50)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . b b b b b b . . . . . 
        . . . b b 9 9 9 9 9 9 b b . . . 
        . . b b 9 9 9 9 9 9 9 9 b b . . 
        . b b 9 d 9 9 9 9 9 9 9 9 b b . 
        . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
        b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
        b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
        b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
        b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
        . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
        . b d 5 3 3 3 3 3 3 3 d 5 b b . 
        . . b d 5 d 3 3 3 3 5 5 b b . . 
        . . . b b 5 5 5 5 5 5 b b . . . 
        . . . . . b b b b b b . . . . . 
        `, Squirtle, 0, 50)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . b b b b b b . . . . . 
        . . . b b 9 9 9 9 9 9 b b . . . 
        . . b b 9 9 9 9 9 9 9 9 b b . . 
        . b b 9 d 9 9 9 9 9 9 9 9 b b . 
        . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
        b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
        b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
        b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
        b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
        . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
        . b d 5 3 3 3 3 3 3 3 d 5 b b . 
        . . b d 5 d 3 3 3 3 5 5 b b . . 
        . . . b b 5 5 5 5 5 5 b b . . . 
        . . . . . b b b b b b . . . . . 
        `, Squirtle, -50, 50)
}
function bubble_attack () {
    Water_Gun = sprites.create(img`
        . . . . . . . . b b . . . . . . 
        . . . . . . . b 9 1 b . . . . . 
        . . b b . . . b 9 9 b . . . . . 
        . b 9 1 b . . b b b . . b b b . 
        . b 3 9 b . b b b b . b 9 9 1 b 
        . b b b b b 9 9 1 1 b b 3 9 9 b 
        . . . . b 9 d 9 1 1 b b b b b . 
        . . . . b 5 3 9 9 9 b . . . . . 
        . . b b b 5 3 3 d 9 b . . . . . 
        . b 5 1 b b 5 5 9 b b b b . . . 
        . b 5 5 b b b b b b 3 9 9 3 . . 
        . b b b b b b b . b 9 1 1 9 b . 
        . . . b 5 5 1 b . b 9 1 1 9 b . 
        . . . b 5 5 5 b . b 3 9 9 3 b . 
        . . . . b b b . . . b b b b . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.basic_projectile)
    Water_Gun.setFlag(SpriteFlag.AutoDestroy, true)
    Water_Gun.setFlag(SpriteFlag.DestroyOnWall, true)
    Water_Gun.setPosition(Squirtle.x, Squirtle.y)
    spriteutils.setVelocityAtAngle(Water_Gun, spriteutils.angleFrom(Squirtle, Closest_Enemy[0]), 100)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "HP", -4)
    if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
        sprites.destroy(otherSprite, effects.fountain, 1000)
        level_up_bar.value += sprites.readDataNumber(otherSprite, "XP")
        info.changeScoreBy(sprites.readDataNumber(otherSprite, "XP"))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
let Closest_Enemy: Sprite[] = []
let Water_Gun: Sprite = null
let projectile: Sprite = null
let level_up_tracker = 0
let Lightning: Sprite = null
let enemy_xp: number[] = []
let enemy_hp: number[] = []
let enemy_cooldown: number[] = []
let enemy_special: number[] = []
let enemy_speed: number[] = []
let enemy_pokemon: Sprite = null
let enemy_image: Image[] = []
let Random_enemy_chooser = 0
let level_up_bar: StatusBarSprite = null
let evolution_tracker = 0
let Squirtle: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Squirtle = sprites.create(assets.image`squirtle art`, SpriteKind.Player)
tiles.placeOnRandomTile(Squirtle, sprites.castle.tileDarkGrass2)
scene.cameraFollowSprite(Squirtle)
controller.moveSprite(Squirtle)
Enemy_Templates(assets.image`Charmander`, 45, 1, 6, 1, 1)
Enemy_Templates(assets.image`pikachu`, 55, 2, 2000, 2, 2)
Enemy_Templates(assets.image`Gengar`, 65, 3, 2, 4, 4)
info.setLife(3)
spriteutils.setLifeImage(img`
    . . . . . . . 
    . . f f f . . 
    . f 2 2 2 f . 
    f 2 2 2 2 2 f 
    f f f f f f f 
    f 1 1 1 1 1 f 
    . f 1 1 1 f . 
    . . f f f . . 
    `)
info.setScore(0)
evolution_tracker = 0
level_up_bar = statusbars.create(155, 5, StatusBarKind.experience)
level_up_bar.setColor(5, 15)
level_up_bar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
level_up_bar.max = 3
level_up_bar.value = 0
level_up_bar.positionDirection(CollisionDirection.Bottom)
game.onUpdateInterval(1000, function () {
    Spawn_Enemy()
})
game.onUpdateInterval(500, function () {
    Closest_Enemy = spriteutils.getSpritesWithin(SpriteKind.Enemy, 75, Squirtle)
    bubble_attack()
})
game.onUpdateInterval(100, function () {
    Enemy_Attack()
})
game.onUpdateInterval(3000, function () {
    if (2 <= evolution_tracker) {
        piercing_bubbles()
        scene.cameraShake(4, 500)
    }
})
