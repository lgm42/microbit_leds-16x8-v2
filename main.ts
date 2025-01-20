input.onButtonPressed(Button.A, function () {
    raq_x += -1
    if (raq_x == 0) {
        raq_x = 1
    }
})
function dessine_raquette (x: number, y: number, image: Image) {
    leds16x8.definir_pixel(image, x, y, true)
    leds16x8.definir_pixel(image, x + 1, y, true)
    leds16x8.definir_pixel(image, x - 1, y, true)
}
input.onButtonPressed(Button.B, function () {
    raq_x += 1
    if (raq_x == 15) {
        raq_x = 14
    }
})
let img2: Image = null
let raq_x = 0
let img = leds16x8.creer_image(`
    # . . . . . . . . . . . . . . #
    # . . . . . . . . . . . . . . #
    # . . . . . . . . . . . . . . #
    # . . . . . . . . . . . . . . #
    # . . . . . . . . . . . . . . #
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `)
leds16x8.montrer_image(img)
let raq_y = 6
raq_x = 10
basic.forever(function () {
    img2 = leds16x8.cloneImage(img)
    dessine_raquette(raq_x, raq_y, img2)
    leds16x8.montrer_image(img2)
})
