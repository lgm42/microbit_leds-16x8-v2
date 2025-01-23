let img2: Image = null
let img = leds16x8.create16x8Image(`
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
    img2 = leds16x8.clone16x8Image(img)
    leds16x8.setPixel(img2, 2, 2, true)
    leds16x8.show16x8Image(img2)
})