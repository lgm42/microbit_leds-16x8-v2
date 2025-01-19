/**
 * Creates an image for 16x8 display.
 */
/**
 * Ligne actuelle des données
 */
// we create the buffer to send
function montrer_grande_image (image: Image) {
    let rawBuffer: number[] = []
    if (image.width() != 16) {
        return
    }
    if (image.height() != 8) {
        return
    }
    for (let x = 0; x <= image.width() - 1; x++) {
        for (let y = 0; y <= image.height() - 1; y++) {
            if (image.pixel(x, y)) {
                column += 1
            }
            column <<= 1;
        }
        rawBuffer.push(column)
    }
    // ************ Activer l'incrémentation automatique ************
    IIC_start()
    IIC_send(64)
    IIC_end()
    // ********** Envoyer les données d'affichage ***************
    IIC_start()
    // Adresse mémoire de départ (0x00)
    IIC_send(192)
    for (let j = 0; j <= 15; j++) {
        IIC_send(rawBuffer[j])
    }
    IIC_end()
    // *********** Régler la luminosité ***************
    IIC_start()
    // Réglage de la luminosité
    IIC_send(138)
    IIC_end()
}
// Fonction : Démarrer la communication I²C
function IIC_start () {
    pins.digitalWritePin(IIC_SDA, 1)
    pins.digitalWritePin(IIC_SCL, 1)
    control.waitMicros(3)
    pins.digitalWritePin(IIC_SDA, 0)
    control.waitMicros(3)
    pins.digitalWritePin(IIC_SCL, 0)
    control.waitMicros(3)
}
// Compteur pour changer la ligne
// Fonction : Initialiser l'état des broches
function initPins () {
    pins.digitalWritePin(IIC_SCL, 1)
    pins.digitalWritePin(IIC_SDA, 1)
}
input.onButtonPressed(Button.A, function () {
    montrer_grande_image(img)
    serial.writeValue("width", img.width())
    serial.writeValue("height", img.height())
})
input.onButtonPressed(Button.B, function () {
    toto = images.createBigImage(`
        # . . . . . . . # .
        . # . . . . . # . .
        . . # . . . # . . .
        . . . # . # . . . .
        . . . . # . . . . .
        `)
})
// Fonction : Terminer la communication I²C
function IIC_end () {
    pins.digitalWritePin(IIC_SCL, 0)
    control.waitMicros(3)
    pins.digitalWritePin(IIC_SDA, 0)
    control.waitMicros(3)
    pins.digitalWritePin(IIC_SCL, 1)
    control.waitMicros(3)
    pins.digitalWritePin(IIC_SDA, 1)
    control.waitMicros(3)
}
// Fonction : Envoyer un octet via I²C
function IIC_send (sendData: number) {
    for (let index = 0; index < 8; index++) {
        pins.digitalWritePin(IIC_SCL, 0)
        control.waitMicros(3)
        if (sendData & 0x01) {
            pins.digitalWritePin(IIC_SDA, 1)
        } else {
            pins.digitalWritePin(IIC_SDA, 0)
        }
        sendData >>= 1;
control.waitMicros(3)
        pins.digitalWritePin(IIC_SCL, 1)
        control.waitMicros(3)
    }
}
let dataLine = 0
let delayCount = 0
let toto: Image = null
let IIC_SCL = 0
let IIC_SDA = 0
let column = 0
IIC_SDA = DigitalPin.P20
IIC_SCL = DigitalPin.P19
let img : Image;
// Initialiser les broches au démarrage
initPins()
img = images.createBigImage(`
    # . . . # # # # . #. . . . . .
    # # # . # # # # . #. . . . . .
    # . . . # # # # . #. . . . . .
    # . . . # # # # . #. . . . . .
    # . . . # # # # . #. . . . . .
    # . . . # # # # . #. . . . . .
    # # # . # # # # . #. . . . . .
    # . . . # # # # . #. . . . . .
    `)
// Programme principal
basic.forever(function () {
    // *********** Mise à jour de la ligne ***************
    delayCount += 1
    if (delayCount >= 10) {
        delayCount = 0
        // Passer à la ligne suivante
        dataLine = (dataLine + 1) % 4
    }
    // Petite pause
    basic.pause(100)
})
