
const renameFile = (bits, name, options) => {
    try {
        return new File(JSON.stringify[bits], name, options);
    } catch (e) {
        let myBlob = new Blob(JSON.stringify[bits], options || {});
        myBlob.lastModified = new Date();
        myBlob.name = name;
        return myBlob;
    }

}

export default renameFile;