import { decrypt, encrypt } from "..";

// Encrypt Message between UserA to UserB
const message = "Private Message, shhhh!";
const userA = {
    account_name: "usera",
    private_key: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    public_key: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
};
const userB = {
    account_name: "userb",
    private_key: "5K161xgejtry4oNF8oEJK2JqPjGjRgvwovT4E9LmLDCVn8t2nmd",
    public_key: "EOS7e5HoG59HEbtCmjgVWv3p6jRvp2bJ4Zt4rBFLaifK3yP36XMke",
};

const encrypted = encrypt(userA.private_key, userB.public_key, message);
console.log(encrypted);

const decrypted = decrypt(userB.private_key, userA.public_key, encrypted);
console.log(decrypted);
