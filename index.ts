import { Aes, Crypt } from "eosjs-ecc";
import padStart from "lodash.padstart";
import Long from "long";

export let MEMO = "TO DECRYPT: eos-encrypt\n";

/**
 * Encrypt Message
 *
 * @param {string} private_key EOSIO Private Key
 * @param {string} public_key EOSIO Public Key
 * @param {string} message Message to Encrypt
 * @param {string} [memo="TO DECRYPT: eos-encrypt\n"] Serialized Memo
 * @param {number} [maxsize=256] Maximum character message size
 * @returns {string} Encrypted Message
 * @example
 *
 * const encrypted = encrypt(private_key, public_key, message);
 */
export function encrypt(private_key: string, public_key: string, message: string, memo = MEMO, maxsize = 256) {
    const buff = Aes.encrypt(private_key, public_key, message);
    const str = serialize(buff, memo);

    if (maxsize !== -1 && str.length > maxsize) { throw new Error(`message too long (max ${maxsize} chars)`); }

    return str;
}

/**
 * Decrypt Message
 *
 * @param {string} private_key EOSIO Private Key
 * @param {string} public_key EOSIO Public Key
 * @param {string} message Encrypted Message
 * @param {string} [memo="TO DECRYPT: eos-encrypt\n"] Serialized Memo
 * @returns {string} Decrypted Message
 * @example
 *
 * const decrypted = decrypt(private_key, public_key, message);
 */
export function decrypt(private_key: string, public_key: string, message: string, memo = MEMO) {
    const { nonce, content, checksum } = deserialize(message, memo);
    const decrypted = Aes.decrypt(private_key, public_key, nonce, content, checksum);

    return decrypted.toString("utf8");
}

/**
 * Serialize
 *
 * @private
 * @param {Crypt} buff Aes.encrypt => Object
 * @param {string} [memo="TO DECRYPT: eos-encrypt\n"] Serialized Memo
 * @returns {string} Serialized String
 * @example
 *
 * const buff = Aes.encrypt(private_key, public_key, message);
 * const str = serialize(buff);
 */
export function serialize(buff: Crypt, memo = MEMO) {
    let str = memo;

    str += padStart(buff.nonce.low.toString(), 11, ".");
    str += padStart(buff.nonce.high.toString(), 11, ".");
    str += padStart(buff.checksum.toString(), 11, ".");
    str += buff.message.toString("base64");

    return str;
}

/**
 * Deserialize
 *
 * @private
 * @param {string} message Message to deserialize
 * @param {string} [memo="TO DECRYPT: eos-encrypt\n"] Serialized Memo
 * @returns {Object} Deserialize Object
 * @example
 *
 * const { nonce, content, checksum } = deserialize(message);
 * const decrypted = Aes.decrypt(private_key, public_key, nonce, content, checksum);
 */
export function deserialize(message: string, memo = MEMO) {
    message = message.replace(memo, "");

    const low = parseInt(message.substring(0, 11).replace(/[.]/g, ""), 10);
    const high = parseInt(message.substring(11, 22).replace(/[.]/g, ""), 10);
    const checksum = parseInt(message.substring(22, 33).replace(/[.]/g, ""), 10);
    message = message.substring(33, message.length);

    return {
        checksum,
        content: Buffer.from(message, "base64"),
        nonce: new Long(low, high, false),
    };
}

/**
 * Set Default Memo
 *
 * @param {string} memo Set Memo
 * @returns {void}
 * @example
 *
 * setMemo("TO DECRYPT: my-dapp\n");
 */
export function setMemo(memo: string) {
    MEMO = memo;
}
