/** Install the user-approved Yeshua Roots icon package without altering artwork. */
import {createHash} from "node:crypto";
import {copyFileSync,existsSync,mkdirSync,readFileSync} from "node:fs";
import {join} from "node:path";
const source=process.argv[2];
if(!source){console.error("Usage: node scripts/install-official-icon.mjs <extracted-official-icon-directory>");process.exit(1)}
const master=join(source,"official-master.png");
const expected="fea15e54a829ed57d6c1dfe4f05d24d73d01c962adf566c6acdb3305f1e64ac4";
if(!existsSync(master))throw Error("Official master image missing: "+master);
const actual=createHash("sha256").update(readFileSync(master)).digest("hex");
if(actual!==expected)throw Error("Wrong master artwork. Expected "+expected+" but found "+actual);
const names=["official-master.png","favicon.ico",...[16,32,48,64,96,128,180,192,256,512].map(n=>`icon-${n}.png`)];
const dest=join(process.cwd(),"public/brand/official-icon");
mkdirSync(dest,{recursive:true});
for(const name of names){const from=join(source,name);if(!existsSync(from))throw Error("Missing approved derivative: "+name);copyFileSync(from,join(dest,name));}
console.log("Installed approved official icon package; master SHA-256 verified.");
