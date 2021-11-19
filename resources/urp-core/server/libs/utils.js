import * as alt from 'alt-server';
import db from 'mysql2-wrapper';
import sjcl from 'sjcl';

// Database WRAPPERS
const executeSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response)
        }
        db.execute(query, parameters, resolvePromise, alt.resourceName)
    })
}

const insertSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response)
        }
        db.insert(query, parameters, resolvePromise, alt.resourceName)
    })
}

const updateSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response)
        }
        db.update(query, parameters, resolvePromise, alt.resourceName)
    })
}

/** 
* Gets the direction the player is facing.
* @param {alt.Vector3} rot
*/
function getForwardVector(rot) {
   const z = rot.z;
   const x = rot.x;
   const num = Math.abs(Math.cos(x));
   return new alt.Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
}

/** 
* Return a position in front of a player based on distance.
* @export
* @param {alt.Player} player
* @param {number} distance
* @return {*}  {alt.Vector3}
*/
function getVectorInFrontOfPlayer(source, distance)  {
   const forwardVector = getForwardVector(source.rot);
   const posFront = {
       x: source.pos.x + forwardVector.x * distance,
       y: source.pos.y + forwardVector.y * distance,
       z: source.pos.z
   };

   return new alt.Vector3(posFront.x, posFront.y, posFront.z);
}
// STUYK'S Encryption System
// https://github.com/Stuyk

/**
 * Hash a plain text password with pbkdf2 hash and salt.
 * @param  {string} plainString
 * @returns string
 */
const hashString = (plainString) => {
    const saltBits = sjcl.random.randomWords(24, 0);
    const salt = sjcl.codec.base64.fromBits(saltBits);
    const key = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(plainString, saltBits, 2000, 48));
    return `${key}$${salt}`;
}

/**
 * Test a pbkdf2 hash and salt against a plain text password.
 * @param  {string} plainString
 * @param  {string} pbkdf2Hash
 * @returns boolean
 */
const compareHash = (plainString, pbkdf2Hash) => {
    const [_key, _salt] = pbkdf2Hash.split('$');
    const saltBits = sjcl.codec.base64.toBits(_salt);
    const derivedKey = sjcl.misc.pbkdf2(plainString, saltBits, 2000, 48);
    const derivedBaseKey = sjcl.codec.base64.fromBits(derivedKey);
    if (_key != derivedBaseKey) {
        return false;
    }

    return true;
}

export { executeSync, insertSync, updateSync, hashString, compareHash, getForwardVector, getVectorInFrontOfPlayer }