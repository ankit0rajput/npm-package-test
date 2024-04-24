
const crypto = require('crypto');

const algo = 'aes-256-cbc'; // works - but this is old one
const aesKey = 'bcTol4yZv140nf3WA6U08YyPx6aCbE6GVTxwILW7dOg='; //base64
const iv = crypto.randomBytes(16);

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
	modulusLength: 2048, // Key size
	publicKeyEncoding: {
		type: 'pkcs1', // Public key format
		format: 'pem' // PEM encoded
	},
	privateKeyEncoding: {
		type: 'pkcs1', // Private key format
		format: 'pem' // PEM encoded
	}
});

console.log('RSA Public Key:');
console.log(publicKey);
console.log('\nRSA Private Key:');
console.log(privateKey);


const reqBody = {
    "phone": {
        "number": "9526320219",
        "countryId": 103
    },
    "primaryEmail": "rt@yopmail.com",
    "accountTypeCode": "01",
    "indianCitizen": true,
    "usCanadaResident": false,
    "residenceStatusCode": "21",
    "folioPans": []
}
const applicationName = "FIN"
const browserId  = crypto.randomBytes(32);

function initilizeAES(applicationName,publicKey,browserId){
	const AESKey = Buffer.from(browserId, 'utf-8').toString('base64');
	// const base64String = Buffer.from(inputString, 'utf-8').toString('base64');
	console.log('AESKEY => ',AESKey)
	const encryptedAESKey = encryptWithRSAPublicKey(AESKey,publicKey)
	console.log('Encrypted AESKEY => ',encryptedAESKey)
	return encryptedAESKey;
}

function encryptWithRSAPublicKey(data, publicKey) {
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING // Padding scheme
        },
        Buffer.from(data, 'utf-8')
    );
    return encryptedData.toString('base64');
}
function decryptWithRSAPrivateKey(encryptedData, privateKey) {
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING // Padding scheme
        },
        Buffer.from(encryptedData, 'base64')
    );
    return decryptedData.toString('utf-8');
}

const encryptedAESKey = initilizeAES(applicationName,publicKey,browserId)
const decryptedAESKey = decryptWithRSAPrivateKey(encryptedAESKey, privateKey)
console.log('AESKEY => ',decryptedAESKey)

function encryptReq(body, aesKey, iv) {
  console.log('Initial body:');
  console.log(body);

  let cipher = crypto.createCipheriv(algo, Buffer.from(aesKey, 'base64'), iv);
  console.log('cipher',cipher)
  let encrypted = cipher.update(JSON.stringify(body));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const res = {
    content: encrypted.toString('base64'),
    nonce: iv.toString('base64'),
  };

  console.log('Encrypted:');
  console.log(res);
  return res;
}

function decryptReq({ content, nonce }, aesKey) {
  const iv = Buffer.from(nonce, 'base64');
  const encryptedData = Buffer.from(content, 'base64');

  const decipher = crypto.createDecipheriv(
    algo,
    Buffer.from(aesKey, 'base64'),
    iv,
  );
  const decrypted = decipher.update(encryptedData);
  const decryptedFinal = Buffer.concat([decrypted, decipher.final()]);
  const data = JSON.parse(decryptedFinal.toString());

  console.log('Decrypted:');
  console.log(data);
  return data;
}

const encryptionResult = encryptReq(reqBody, decryptedAESKey, iv);
decryptReq(encryptionResult, decryptedAESKey);