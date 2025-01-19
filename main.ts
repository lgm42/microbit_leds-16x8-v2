input.onButtonPressed(Button.A, function () {
    leds16x8.montrer_grande_image(img)
})
let img: Image = null
leds16x8.init_leds()
img = leds16x8.creer_grande_image()
