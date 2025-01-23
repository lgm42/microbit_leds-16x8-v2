
/**
 * Custom blocks
 */
//% weight=50 color=#0fbc11 icon="▦"
namespace leds16x8 {

    let IIC_SDA = DigitalPin.P20
    let IIC_SCL = DigitalPin.P19

    // Function : Start I²C communication
    function iicStart() {
        pins.digitalWritePin(IIC_SDA, 1)
        pins.digitalWritePin(IIC_SCL, 1)
        control.waitMicros(3)
        pins.digitalWritePin(IIC_SDA, 0)
        control.waitMicros(3)
        pins.digitalWritePin(IIC_SCL, 0)
        control.waitMicros(3)
    }

    // Function : Finish I²C communication
    function iicEnd() {
        pins.digitalWritePin(IIC_SCL, 0)
        control.waitMicros(3)
        pins.digitalWritePin(IIC_SDA, 0)
        control.waitMicros(3)
        pins.digitalWritePin(IIC_SCL, 1)
        control.waitMicros(3)
        pins.digitalWritePin(IIC_SDA, 1)
        control.waitMicros(3)
    }

    // Function :Send a byte over I²C
    function iicSend(sendData: number) {
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
     * Initialize an empty 16x8 image
     */
    //% block="create empty 16x8 image"
    //% weight=60
    export function create16x8EmptyImage(): Image {
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
     * Create a custom 16x8 image
     */
    //% block="create 16x8 image"
    //% imageLiteral=1 imageLiteralColumns=16 imageLiteralRows=8
    //% imageEditorScale=2   // double the on-screen density for this large image
    //% shim=images::createImage
    //% weight=50
    export function create16x8Image(i: string): Image {
        const im = <Image><any>i; return im
    }

    /**
     * Show the picture
     * @param image Image to show
     */
    //% block="show 16x8 image $image"
    //% weight=40
    export function show16x8Image(image: Image) {
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
        iicStart()
        iicSend(64)
        iicEnd()
        // ********** Envoyer les données d'affichage ***************
        iicStart()
        // Adresse mémoire de départ (0x00)
        iicSend(192)
        for (let j = 0; j < rawBuffer.length; j++) {
            iicSend(rawBuffer[j]);
        }
        iicEnd()
        // *********** Régler la luminosité ***************
        iicStart()
        // Réglage de la luminosité
        iicSend(138)
        iicEnd()
    }

    /**
    * Clone a 16x8 image 
    */
    //% block="clone 16x8 image $img"
    //% weight=30
    export function clone16x8Image(img: Image): Image {
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

    /**
    * Set a pixel in a 16x8 image 
    */
    //% block="in $img set pixel at $x, $y to $value"  inlineInputMode="inline"
    //% weight=20
    export function setPixel(img: Image, x: number, y: number, value: boolean) {
        img.setPixel(x, y, value);
    }

    /**
    * Get a pixel in a 16x8 image 
    */
    //% block="in $img pixel at $x, $y on"  inlineInputMode="inline"
    //% weight=10
    export function isPixelSet(img: Image, x: number, y: number): boolean {
        return img.pixel(x, y);
    }
}
