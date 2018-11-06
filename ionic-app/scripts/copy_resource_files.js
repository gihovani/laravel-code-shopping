const filestocopy = [{
    './icons/drawable-hdpi/ic_card_giftcard.png': [
        './platforms/android/app/src/main/res/drawable-land-hdpi/ic_card_giftcard.png',
        './platforms/android/app/src/main/res/drawable-port-hdpi/ic_card_giftcard.png',
    ],
    './icons/drawable-mdpi/ic_card_giftcard.png': [
        './platforms/android/app/src/main/res/drawable-land-mdpi/ic_card_giftcard.png',
        './platforms/android/app/src/main/res/drawable-port-mdpi/ic_card_giftcard.png',
    ],
    './icons/drawable-xhdpi/ic_card_giftcard.png': [
        './platforms/android/app/src/main/res/drawable-land-xhdpi/ic_card_giftcard.png',
        './platforms/android/app/src/main/res/drawable-port-xhdpi/ic_card_giftcard.png',
    ],
    './icons/drawable-xxhdpi/ic_card_giftcard.png': [
        './platforms/android/app/src/main/res/drawable-land-xxhdpi/ic_card_giftcard.png',
        './platforms/android/app/src/main/res/drawable-port-xxhdpi/ic_card_giftcard.png',
    ],
    './icons/drawable-xxxhdpi/ic_card_giftcard.png': [
        './platforms/android/app/src/main/res/drawable-land-xxxhdpi/ic_card_giftcard.png',
        './platforms/android/app/src/main/res/drawable-port-xxxhdpi/ic_card_giftcard.png',
    ],
}];

const fs = require('fs');
const path = require('path');

filestocopy.forEach(obj => {
    Object.keys(obj).forEach(key => {
        const srcFile = key;

        for (const val of obj[key]) {
            const destFile = val;
            console.log(`copy ${srcFile} to ${destFile}`);
            const destDir = path.dirname(destFile);
            if (fs.existsSync(srcFile) && fs.existsSync(destDir)) {
                fs.createReadStream(srcFile)
                    .pipe(fs.createWriteStream(destFile));
            }
        }
    });
})