import * as alt from 'alt-server';
import { createRequest } from 'urp-notify';
import db from 'mysql2-wrapper';
import sjcl from 'sjcl';

// Prompt WRAPPER
const requestPrompt = (target, message, time) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        createRequest(target, message, time, resolvePromise);
    });
};

// Database WRAPPERS
const executeSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.execute(query, parameters, resolvePromise, alt.resourceName);
    });
};

const insertSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.insert(query, parameters, resolvePromise, alt.resourceName);
    });
};

const updateSync = (query, parameters) => {
    return new Promise((resolve, reject) => {
        const resolvePromise = (response) => {
            resolve(response);
        };
        db.update(query, parameters, resolvePromise, alt.resourceName);
    });
};

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
function getVectorInFrontOfPlayer(source, distance) {
    const forwardVector = getForwardVector(source.rot);
    const posFront = {
        x: source.pos.x + forwardVector.x * distance,
        y: source.pos.y + forwardVector.y * distance,
        z: source.pos.z,
    };

    return new alt.Vector3(posFront.x, posFront.y, posFront.z);
}

/**
 * Get the closest server entity type. Server only.
 * @param {Vector3} playerPosition
 * @param {Vector3} rot player rotation
 * @param {Array<{ pos: Vector3; valid?: boolean }>} entities
 * @param {number} distance
 * @return {*}
 */
function getClosestEntity(
    playerPosition,
    rot,
    entities,
    dist,
    checkBackwards = false
) {
    const fwdVector = getForwardVector(rot);
    let position;

    if (!checkBackwards) {
        position = new alt.Vector3(
            playerPosition.x + fwdVector.x * dist,
            playerPosition.y + fwdVector.y * dist,
            playerPosition.z
        );
    } else {
        position = new alt.Vector3(
            playerPosition.x - fwdVector.x * dist,
            playerPosition.y - fwdVector.y * dist,
            playerPosition.z
        );
    }

    let lastRange = 25;
    let closestEntity;

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];

        if (!entity || !entity.valid) {
            continue;
        }

        const dist = position.distanceTo(entity.pos);
        if (dist > lastRange) {
            continue;
        }

        closestEntity = entity;
        lastRange = dist;
    }

    return closestEntity;
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
    const key = sjcl.codec.base64.fromBits(
        sjcl.misc.pbkdf2(plainString, saltBits, 2000, 48)
    );
    return `${key}$${salt}`;
};

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
};

export {
    executeSync,
    insertSync,
    updateSync,
    hashString,
    compareHash,
    getForwardVector,
    getVectorInFrontOfPlayer,
    getClosestEntity,
    requestPrompt,
};
