input.onButtonPressed(Button.A, function () {
	
})
let img = leds16x8.creer_image(`
    # # # # # # # # # # # # # # # #
    # . . . . . . . . . . . . . . #
    # . . . . . . . . . . . . . . #
    # . # . . # . # . . # . . . . #
    # . # . . # . # . . # . . . . #
    # . # # . # . # # . # # . . . #
    # . . . . . . . . . . . . . . #
    # # # # # # # # # # # # # # # #
    `)
leds16x8.definir_pixel(img, 1, 1, true)
leds16x8.definir_pixel(img, 2, 2, true)
leds16x8.montrer_image(img)
