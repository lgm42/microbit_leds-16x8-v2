
/**
* Utilisez ce fichier pour définir des fonctions et des blocs personnalisés.
* En savoir plus à https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace leds16x8 {
    // Fonction : Terminer la communication I²C
    function IIC_end() {
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
    function IIC_send(sendData: number) {
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

    /**
     * Show the picture
     * @param image Image to show
     */
    //% block
    export function montrer_grande_image(image: Image) {
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

}
