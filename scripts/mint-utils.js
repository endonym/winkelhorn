
function isValidIPFSUri(uri) {
    return typeof uri === "string" && 
        regexIPFSUriV0(uri);
}

function regexIPFSUriV0(uri) {
    const pattern = /^(ipfs):\/\/([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{46})$/;
    return pattern.test(uri);
}

function verifyUris(uris){
    if (Array.isArray(uris)){
        for (let uri in uris){            
            if (!isValidIPFSUri(uris[uri])){
                throw "Check your IPFS URIs index=" + uri + " " + uris[uri];
        
            }
        }
    }
    return true; 
}

module.exports = {
    isValidIPFSUri, 
    verifyUris
};