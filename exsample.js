import admin from 'firebase-admin'
import stream from 'stream';

export function uploadToFirebase(polder, path, img) {
    return new Promise((resolve, reject) => {
        var base64EncodedImageString = img,
        fileName = `image-${Number(new Date())}`,
        imageBuffer = new Buffer(base64EncodedImageString, 'base64');

        var bucket = admin.storage().bucket();
        var file = bucket.file(`/${polder}/${path}/` + fileName);
        file.save(imageBuffer, {
            metadata: { contentType: 'image/jpeg' },
        });

        const config = {
            action: 'read',
            expires: '03-01-2500'
        };

        file.getSignedUrl(config, (error, url) => {
            if (error) {
            reject(error);
            }
            resolve(url);
        });
    })
   
}