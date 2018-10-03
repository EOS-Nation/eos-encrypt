import test from "ava";
import { decrypt, deserialize, encrypt, setMemo } from ".";

// variables
const message = "Private Message, shhhh!";
const public_key = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
const private_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";

const messageEncrypted = `TO DECRYPT: eos-encrypt
.1606600682...23465070.2645171489fuTcDTGHDazPpNifTEM74kOziWL7CFMTMAy4SoTuYEs=`;
const message_long = `Very long message XXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;

test("encrypt", (t) => {
    const encrypted = encrypt(private_key, public_key, message);
    const deserialized = deserialize(encrypted);
    t.truthy(deserialized.nonce);
    t.truthy(deserialized.checksum);
    t.truthy(deserialized.content);
});

test("decrypt", (t) => {
    const decrypted = decrypt(private_key, public_key, messageEncrypted);
    t.is(decrypted, message);
});

test("encrypt + decrypt", (t) => {
    const encrypted = encrypt(private_key, public_key, message);
    const decrypted = decrypt(private_key, public_key, encrypted);
    t.is(decrypted, message);
});

test("errors", (t) => {
    t.truthy(encrypt(private_key, public_key, message_long, -1));
    t.throws(() => encrypt(private_key, public_key, message_long), "message too long (max 256 chars)");
    t.throws(() => encrypt(private_key, public_key, message, 5), "message too long (max 5 chars)");
});

test("setMemo", (t) => {
    setMemo("foo");
    t.regex(encrypt(private_key, public_key, message), /foo/);
    setMemo("bar");
    t.regex(encrypt(private_key, public_key, message), /bar/);
    setMemo("");
    t.truthy(encrypt(private_key, public_key, message));
});
