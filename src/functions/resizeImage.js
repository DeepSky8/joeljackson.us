import convert from 'image-file-resize';
import { updateImageFile } from '../actions/cardActions';

const resizeImage = (e, dispatchCardState) => {
    const imageMimeType = /image\/(jpeg|jpg|gif|png|bmp)/i;

    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
        alert('Image type is not valid');
        return;
    }
    convert({
        file,
        width: 600,
        height: 600,
        type: 'jpg'
    })
        .then((resizedFile) => {
            return dispatchCardState(updateImageFile(resizedFile))
        })
        .catch((error) => {
            console.log('error', error)
        })
}

export default resizeImage