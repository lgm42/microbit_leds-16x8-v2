function dessine_ennemi (x: number, y: number, image: Image) {
    leds16x8.set_pixel(image, x, y, true)
    leds16x8.set_pixel(image, x - 1, y, true)
    leds16x8.set_pixel(image, x, y - 1, true)
    leds16x8.set_pixel(image, x - 1, y - 1, true)
}
input.onButtonPressed(Button.A, function () {
    raq_x += -1
    if (raq_x == 0) {
        raq_x = 1
    }
})
function dessine_raquette (x: number, y: number, image: Image) {
    leds16x8.set_pixel(image, x, y, true)
    leds16x8.set_pixel(image, x + 1, y, true)
    leds16x8.set_pixel(image, x - 1, y, true)
}
input.onButtonPressed(Button.B, function () {
    raq_x += 1
    if (raq_x == 15) {
        raq_x = 14
    }
})
let img2: Image = null
let raq_x = 0
let img = leds16x8.create_image(`
    # # . . . . . . . . . . . . # #
    # . . . . . . . . . . . . . . #
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    # . . . . . . . . . . . . . . #
    # . . . . . . . . . . . . . . #
    `)
leds16x8.show_image(img)
let raq_y = 7
raq_x = 10
let ennemis = [
2,
5,
8,
12
]
if (leds16x8.is_pixel_set(img, 0, 0)) {
    raq_y = 6
}
basic.forever(function () {
    img2 = leds16x8.cloneImage(img)
    dessine_raquette(raq_x, raq_y, img2)
    for (let valeur of ennemis) {
        dessine_ennemi(valeur, 3, img2)
    }
    leds16x8.show_image(img2)
})
