import { decrypt, deserialize, encrypt, serialize } from "../";

// Encrypt Message with Self
const message = "Private Message, shhhh!";
const public_key = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
const private_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";

const encrypted = encrypt(private_key, public_key, message);
const deserialized = deserialize(encrypted);
console.log(encrypted);
console.log(deserialized);

const decrypted = decrypt(private_key, public_key, encrypted);
console.log(decrypted);
