/**
 * Elliptic curve cryptography functions (ECC)
 *
 * Private Key, Public Key, Signature, AES, Encryption / Decryption
 *
 * https://github.com/EOSIO/eosjs-ecc
 */
declare module "eosjs-ecc" {
    import Long from "long";

    export interface Crypt {
        nonce: Long;
        message: Buffer;
        checksum: Buffer | string;
    }

    module Aes {
        /**
            Spec: http://localhost:3002/steem/@dantheman/how-to-encrypt-a-memo-when-transferring-steem
            @arg {PrivateKey} private_key - required and used for decryption
            @arg {PublicKey} public_key - required and used to calcualte the shared secret
            @arg {string} nonce - random or unique uint64, provides entropy when re-using the same private/public keys.
            @arg {Buffer} message - Encrypted or plain text message
            @arg {number} checksum - shared secret checksum
            @throws {Error|TypeError} - "Invalid Key, ..."
            @return {Buffer} - message
        */
        export function decrypt(private_key: string, public_key: string, nonce: Long, message: string | Buffer, checksum: number): Buffer

        /**
            Spec: http://localhost:3002/steem/@dantheman/how-to-encrypt-a-memo-when-transferring-steem
            @throws {Error|TypeError} - "Invalid Key, ..."
            @arg {PrivateKey} private_key - required and used for decryption
            @arg {PublicKey} public_key - required and used to calcualte the shared secret
            @arg {string} [nonce = uniqueNonce()] - assigned a random unique uint64
            @return {object}
            @property {string} nonce - random or unique uint64, provides entropy when re-using the same private/public keys.
            @property {Buffer} message - Plain text message
            @property {number} checksum - shared secret checksum
        */
        export function encrypt(private_key: string, public_key: string, message: string| Buffer, nonce?: string): Crypt
    }
  }