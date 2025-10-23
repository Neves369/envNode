//Converte um base-64 em ArrayBuffer
import {decode} from 'base-64';

export function _base64ToArrayBuffer(base64: any) {
    let binary_string = decode(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

