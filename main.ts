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
                if (value.x >= Squirtle.x) {
                    Lightning = sprites.create(img`
                        . . . . . . . . . . . 4 5 5 . . 
                        . . . . . . . . . . . 4 5 5 . . 
                        . . . . . . . . . . . 4 5 5 . . 
                        . . . . . . . . 4 4 4 4 5 5 . . 
                        . . . . . . . . 4 5 5 5 5 5 . . 
                        . . . . . . . . 4 5 5 5 5 5 . . 
                        . . . . . 4 4 4 4 5 5 . . . . . 
                        . . . . . 4 5 5 5 5 5 . . . . . 
                        . . . . . 4 5 5 5 5 5 . . . . . 
                        . . 4 4 4 4 5 5 . . . . . . . . 
                        . . 4 5 5 5 5 5 . . . . . . . . 
                        . . 4 5 5 5 5 5 . . . . . . . . 
                        . . 4 5 5 . . . . . . . . . . . 
                        . . 4 5 . . . . . . . . . . . . 
                        . . 4 . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Enemy_projectile)
                } else {
                    Lightning = sprites.create(img`
                        . 5 5 4 . . . . . . . . . . . . 
                        . 5 5 4 . . . . . . . . . . . . 
                        . 5 5 4 . . . . . . . . . . . . 
                        . 5 5 4 4 4 4 . . . . . . . . . 
                        . 5 5 5 5 5 4 . . . . . . . . . 
                        . 5 5 5 5 5 4 . . . . . . . . . 
                        . . . . 5 5 4 4 4 4 . . . . . . 
                        . . . . 5 5 5 5 5 4 . . . . . . 
                        . . . . 5 5 5 5 5 4 . . . . . . 
                        . . . . . . . 5 5 4 4 4 4 . . . 
                        . . . . . . . 5 5 5 5 5 4 . . . 
                        . . . . . . . 5 5 5 5 5 4 . . . 
                        . . . . . . . . . . 5 5 4 . . . 
                        . . . . . . . . . . . 5 4 . . . 
                        . . . . . . . . . . . . 4 . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Enemy_projectile)
                }
                Lightning.setFlag(SpriteFlag.AutoDestroy, true)
                Lightning.setFlag(SpriteFlag.DestroyOnWall, true)
                Lightning.setPosition(value.x, value.y)
                spriteutils.setVelocityAtAngle(Lightning, spriteutils.angleFrom(value, Squirtle), 80)
                sprites.setDataNumber(value, "NextShot", game.runtime() + sprites.readDataNumber(value, "Cooldown"))
            }
        }
    }
}
function big_bubbles () {
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
function warturtle_attack () {
    if (!(orb)) {
        orb = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . 8 8 1 8 8 1 8 8 . . . . . 
            . . 8 8 1 1 8 8 1 1 8 8 . . . . 
            . 8 8 1 8 8 1 1 8 8 1 8 8 . . . 
            . 8 8 8 1 8 8 8 8 1 8 8 8 . . . 
            . . 8 8 8 1 1 1 1 8 8 8 . . . . 
            . . . 8 8 8 8 8 8 8 8 . . . . . 
            . . . 8 8 1 1 1 1 8 8 . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . . 8 8 1 1 8 8 . . . . . . 
            . . . . . 8 8 8 8 . . . . . . . 
            . . . . . 8 8 1 8 . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . 8 1 . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            `, SpriteKind.basic_projectile)
        animation.runImageAnimation(
        orb,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . 8 8 8 8 8 8 8 8 . . . . . 
            . . 8 8 8 8 8 8 8 8 8 8 . . . . 
            . 8 8 9 8 8 8 8 8 8 9 8 8 . . . 
            . 8 8 8 9 8 8 8 8 9 8 8 8 . . . 
            . . 8 8 8 9 9 9 9 8 8 8 . . . . 
            . . . 8 8 8 8 8 8 8 8 . . . . . 
            . . . 8 8 9 9 9 9 8 8 . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . . 8 8 9 9 8 8 . . . . . . 
            . . . . . 8 8 8 8 . . . . . . . 
            . . . . . 8 8 9 8 . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . 8 9 . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . 8 8 8 9 8 8 9 8 . . . . . 
            . . 8 8 8 9 9 8 8 9 9 8 . . . . 
            . 8 8 8 9 8 8 9 9 8 8 9 8 . . . 
            . 8 8 8 8 9 8 8 8 8 9 8 8 . . . 
            . . 8 8 8 8 9 9 9 9 8 8 . . . . 
            . . . 8 8 8 8 8 8 8 8 . . . . . 
            . . . 8 8 8 9 9 9 9 8 . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . . 8 8 8 9 9 8 . . . . . . 
            . . . . . 8 8 8 8 . . . . . . . 
            . . . . . 8 8 8 9 . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . 8 9 8 8 9 8 8 8 . . . . . 
            . . 8 9 9 8 8 9 9 8 8 8 . . . . 
            . 8 9 8 8 9 9 8 8 9 8 8 8 . . . 
            . 8 8 9 8 8 8 8 9 8 8 8 8 . . . 
            . . 8 8 9 9 9 9 8 8 8 8 . . . . 
            . . . 8 8 8 8 8 8 8 8 . . . . . 
            . . . 8 9 9 9 9 8 8 8 . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . . 8 9 9 8 8 8 . . . . . . 
            . . . . . 8 8 8 8 . . . . . . . 
            . . . . . 9 8 8 8 . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . 9 8 . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . 8 8 9 8 8 8 9 8 . . . . . 
            . . 8 8 9 9 8 8 8 9 9 8 . . . . 
            . 8 8 9 8 8 9 8 8 8 9 8 8 . . . 
            . 8 8 8 9 8 8 8 9 8 8 8 8 . . . 
            . . 8 8 8 9 9 8 8 8 8 8 . . . . 
            . . . 8 8 8 8 8 8 8 8 . . . . . 
            . . . 8 8 9 9 8 8 8 8 . . . . . 
            . . . . 8 8 8 8 8 8 . . . . . . 
            . . . . 8 8 9 8 8 8 . . . . . . 
            . . . . . 8 8 8 8 . . . . . . . 
            . . . . . 8 9 8 8 . . . . . . . 
            . . . . . . 8 8 . . . . . . . . 
            . . . . . . 8 9 . . . . . . . . 
            . . . . . . . 8 . . . . . . . . 
            `],
        150,
        true
        )
    }
}
// Makes sure enempies not overlap eachothertest
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
info.onCountdownEnd(function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy_projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    enemy_shot_me = damageIndicators.makeIndicator("-1", 10)
    damageIndicators.showIndicatorSprite(sprite, enemy_shot_me)
})
statusbars.onStatusReached(StatusBarKind.experience, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 100, function (status) {
    level_up_tracker += 1
    level_up_bar.max = level_up_bar.max + amount_it_gets_harder_to_increase_level_by
    level_up_bar.value = 0
    textSprite2.setText("LVL " + text.stringify(level_up_tracker))
    if (level_up_tracker == 5) {
        Squirtle.setImage(assets.image`warturtle`)
        evolution_tracker += 1
        scene.cameraShake(6, 1000)
        info.changeLifeBy(2)
    } else if (level_up_tracker == 10) {
        Squirtle.setImage(assets.image`blastoise`)
        evolution_tracker += 1
        scene.cameraShake(6, 1000)
        info.changeLifeBy(3)
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
    if (sprite == orb) {
        orb = spriteutils.nullConsts(spriteutils.NullConsts.Null)
    }
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "HP", -1)
    myIndicator = damageIndicators.makeIndicator("-1", 2)
    damageIndicators.showIndicatorSprite(otherSprite, myIndicator)
    if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
        sprites.destroy(otherSprite, effects.fountain, 1000)
        info.changeScoreBy(sprites.readDataNumber(otherSprite, "XP"))
        level_up_bar.value += sprites.readDataNumber(otherSprite, "XP")
    }
})
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
    _3_bubble_attack = damageIndicators.makeIndicator("-4", 2)
    damageIndicators.showIndicatorSprite(otherSprite, _3_bubble_attack)
    if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
        sprites.destroy(otherSprite, effects.fountain, 1000)
        level_up_bar.value += sprites.readDataNumber(otherSprite, "XP")
        info.changeScoreBy(sprites.readDataNumber(otherSprite, "XP"))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    touch_enemy = damageIndicators.makeIndicator("-1", 10)
    damageIndicators.showIndicatorSprite(sprite, touch_enemy)
})
let touch_enemy: damageIndicators.Indicator = null
let _3_bubble_attack: damageIndicators.Indicator = null
let Closest_Enemy: Sprite[] = []
let Water_Gun: Sprite = null
let myIndicator: damageIndicators.Indicator = null
let enemy_shot_me: damageIndicators.Indicator = null
let orb: Sprite = null
let projectile: Sprite = null
let Lightning: Sprite = null
let enemy_xp: number[] = []
let enemy_hp: number[] = []
let enemy_cooldown: number[] = []
let enemy_special: number[] = []
let enemy_speed: number[] = []
let enemy_pokemon: Sprite = null
let enemy_image: Image[] = []
let Random_enemy_chooser = 0
let textSprite2: TextSprite = null
let level_up_tracker = 0
let level_up_bar: StatusBarSprite = null
let evolution_tracker = 0
let amount_it_gets_harder_to_increase_level_by = 0
let Squirtle: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
Squirtle = sprites.create(assets.image`squirtle art`, SpriteKind.Player)
tiles.placeOnRandomTile(Squirtle, sprites.castle.tileDarkGrass2)
scene.cameraFollowSprite(Squirtle)
controller.moveSprite(Squirtle)
Enemy_Templates(assets.image`Charmander`, 45, 1, 5000, 1, 1)
Enemy_Templates(assets.image`pikachu`, 55, 2, 2000, 2, 2)
Enemy_Templates(assets.image`Gengar`, 65, 3, 3000, 4, 4)
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
amount_it_gets_harder_to_increase_level_by = 1
let base_amount_of_xp_need_to_levelup = 3
evolution_tracker = 0
level_up_bar = statusbars.create(155, 5, StatusBarKind.experience)
level_up_bar.setColor(5, 15)
level_up_bar.max = base_amount_of_xp_need_to_levelup
level_up_bar.value = 0
level_up_bar.setStatusBarFlag(StatusBarFlag.HideTargetPreview, true)
level_up_bar.positionDirection(CollisionDirection.Bottom)
level_up_tracker = 0
textSprite2 = textsprite.create("LVL " + text.stringify(level_up_tracker), 15, 1)
textSprite2.setPosition(15, 111)
textSprite2.setFlag(SpriteFlag.RelativeToCamera, true)
let angle = 0
let radius = 30
info.startCountdown(90)
game.onUpdateInterval(750, function () {
    Spawn_Enemy()
})
forever(function () {
    if (orb) {
        angle += 0.05
        orb.setPosition(Squirtle.x + Math.cos(angle) * radius, Squirtle.y + Math.sin(angle) * radius)
    }
})
game.onUpdateInterval(500, function () {
    Closest_Enemy = spriteutils.getSpritesWithin(SpriteKind.Enemy, 75, Squirtle)
    bubble_attack()
})
game.onUpdateInterval(100, function () {
    Enemy_Attack()
})
game.onUpdateInterval(3000, function () {
    if (1 <= evolution_tracker) {
        warturtle_attack()
    }
    if (2 <= evolution_tracker) {
        big_bubbles()
        scene.cameraShake(4, 500)
    }
})
