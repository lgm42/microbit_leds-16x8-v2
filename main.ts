
/**
 * Custom blocks
 */
//% weight=50 color=#0fbc11 icon="▦"
namespace leds16x8 {

    let IIC_SDA = DigitalPin.P20
    let IIC_SCL = DigitalPin.P19

    // Fonction : Démarrer la communication I²C
    function IIC_start() {
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
    function initPins() {
        pins.digitalWritePin(IIC_SCL, 1)
        pins.digitalWritePin(IIC_SDA, 1)
    }

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
        // pins.digitalWritePin(IIC_SCL, 0)
        // pins.digitalWritePin(IIC_SDA, 0)
        // control.waitMicros(3)
        // pins.digitalWritePin(IIC_SCL, 1)
        // control.waitMicros(3)
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
     * Initialise une image vide
     */
    //% block="Create empty 16x8 image"
    //% weight=60
    export function create_empty_image(): Image {
        return images.createBigImage(`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `)
    }

    /**
     * Créer une image personnalisée 16x8
     */
    //% block="Create 16x8 image"
    //% imageLiteral=1 imageLiteralColumns=16 imageLiteralRows=8
    //% imageEditorScale=2   // double the on-screen density for this large image
    //% shim=images::createImage
    //% weight=50
    export function create_image(i: string): Image {
        const im = <Image><any>i; return im
    }

    /**
     * Show the picture
     * @param image Image to show
     */
    //% block="Show 16x8 image $image"
    //% weight=40
    export function show_image(image: Image) {
        let rawBuffer: number[] = []
        if (image.width() != 16) {
            return
        }
        if (image.height() != 8) {
            return
        }
        for (let x = 0; x <= image.width() - 1; x++) {
            let column = 0;
            for (let y = 0; y <= image.height() - 1; y++) {
                column <<= 1; // Décale vers la gauche pour faire de la place pour le nouveau bit
                let yInverted = 7 - y;
                if (image.pixel(x, yInverted)) {
                    column |= 1;
                }
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
        for (let j = 0; j < rawBuffer.length; j++) {
            IIC_send(rawBuffer[j]);
        }
        IIC_end()
        // *********** Régler la luminosité ***************
        IIC_start()
        // Réglage de la luminosité
        IIC_send(138)
        IIC_end()
    }

    /**
    * Cloner une image 16x8
    */
    //% block="Clone 16x8 image $img"
    //% weight=30
    export function cloneImage(img: Image): Image {
        let copie = images.createBigImage(`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `);

        for (let x = 0; x < img.width(); x++) {
            for (let y = 0; y < img.height(); y++) {
                copie.setPixel(x, y, img.pixel(x, y));
            }
        }

        return copie;
    }

    //% block="In $img set pixel at $x, $y to $value"  inlineInputMode="inline"
    //% weight=20
    export function set_pixel(img: Image, x: number, y: number, value: boolean) {
        img.setPixel(x, y, value);
    }

    //% block="In $img pixel at $x, $y on"  inlineInputMode="inline"
    //% weight=10
    export function is_pixel_set(img: Image, x: number, y: number): boolean {
        return img.pixel(x, y);
    }
}
