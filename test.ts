let img2: Image = null
let img = leds16x8.createImage(`
    . . # . . . . . . . # . . . # .
    . # # # . . . . . # # # . # # #
    # # . # # . # . # # # # # # # #
    # . . . # # # # # . . . # . . .
    # . . . # . . . # . . . # . . .
    # . . . # . . . # . . . # . . .
    # . . . # . . . # . . . # . . .
    # # # # # # # # # . . . # . . .
    `)
basic.forever(function () {
    img2 = leds16x8.cloneImage(img)
    leds16x8.setPixel(img2, 2, 2, true)
    leds16x8.showImage(img2)
})