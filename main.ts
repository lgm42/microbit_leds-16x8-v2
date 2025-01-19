input.onButtonPressed(Button.A, function () {
	
})
leds16x8.init_leds()
let img = leds16x8.creer_image_vide()
leds16x8.definir_pixel(
img,
1,
1,
true
)
leds16x8.definir_pixel(
img,
2,
2,
true
)
leds16x8.montrer_grande_image(img)
