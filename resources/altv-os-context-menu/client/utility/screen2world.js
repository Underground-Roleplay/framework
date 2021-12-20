import * as native from 'natives';
import * as alt from 'alt';

function mulNumber(vector1, value) {
    return {
        x: vector1.x * value,
        y: vector1.y * value,
        z: vector1.z * value
    };
}

function addVector3(vector1, vector2) {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
        z: vector1.z + vector2.z
    };
}

function subVector3(vector1, vector2) {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
        z: vector1.z - vector2.z
    };
}

function rotationToDirection(rotation) {
    let z = degToRad(rotation.z);
    let x = degToRad(rotation.x);
    let num = Math.abs(Math.cos(x));

    let result = {};
    result.x = -Math.sin(z) * num;
    result.y = Math.cos(z) * num;
    result.z = Math.sin(x);
    return result;
}

function w2s(position) {
    let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, undefined, undefined);

    if (!result[0]) {
        return undefined;
    }

    let newPos = {};
    newPos.x = (result[1] - 0.5) * 2;
    newPos.y = (result[2] - 0.5) * 2;
    newPos.z = 0;
    return newPos;
}

function processCoordinates(x, y) {
    const [_, width, height] = native.getActiveScreenResolution(0, 0);
    const screenX = width;
    const screenY = height;

    let relativeX = 1 - (x / screenX) * 1.0 * 2;
    let relativeY = 1 - (y / screenY) * 1.0 * 2;

    if (relativeX > 0.0) {
        relativeX = -relativeX;
    } else {
        relativeX = Math.abs(relativeX);
    }

    if (relativeY > 0.0) {
        relativeY = -relativeY;
    } else {
        relativeY = Math.abs(relativeY);
    }

    return { x: relativeX, y: relativeY };
}

function s2w(camPos, relX, relY) {
    const camRot = native.isGameplayCamRendering() ? native.getGameplayCamRot(0) : native.getCamRot(native.getRenderingCam(), 0);
    const camForward = rotationToDirection(camRot);
    const rotUp = addVector3(camRot, { x: 10, y: 0, z: 0 });
    const rotDown = addVector3(camRot, { x: -10, y: 0, z: 0 });
    const rotLeft = addVector3(camRot, { x: 0, y: 0, z: -10 });
    const rotRight = addVector3(camRot, { x: 0, y: 0, z: 10 });

    const camRight = subVector3(rotationToDirection(rotRight), rotationToDirection(rotLeft));
    const camUp = subVector3(rotationToDirection(rotUp), rotationToDirection(rotDown));

    const rollRad = -degToRad(camRot.y);

    const camRightRoll = subVector3(mulNumber(camRight, Math.cos(rollRad)), mulNumber(camUp, Math.sin(rollRad)));
    const camUpRoll = addVector3(mulNumber(camRight, Math.sin(rollRad)), mulNumber(camUp, Math.cos(rollRad)));

    const point3D = addVector3(addVector3(addVector3(camPos, mulNumber(camForward, 10.0)), camRightRoll), camUpRoll);

    const point2D = w2s(point3D);

    if (point2D === undefined) {
        return addVector3(camPos, mulNumber(camForward, 10.0));
    }

    const point3DZero = addVector3(camPos, mulNumber(camForward, 10.0));
    const point2DZero = w2s(point3DZero);

    if (point2DZero === undefined) {
        return addVector3(camPos, mulNumber(camForward, 10.0));
    }

    const eps = 0.001;

    if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
        return addVector3(camPos, mulNumber(camForward, 10.0));
    }

    const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    const point3Dret = addVector3(
        addVector3(addVector3(camPos, mulNumber(camForward, 10.0)), mulNumber(camRightRoll, scaleX)),
        mulNumber(camUpRoll, scaleY)
    );

    return point3Dret;
}

function degToRad(deg) {
    return (deg * Math.PI) / 180.0;
}

// Get entity, ground, etc. targeted by mouse position in 3D space.
export function screenToWorld(flags, ignore) {
    const x = alt.getCursorPos().x;
    const y = alt.getCursorPos().y;

    const absoluteX = x;
    const absoluteY = y;

    const camPos = native.isGameplayCamRendering() ? native.getGameplayCamCoord() : native.getCamCoord(native.getRenderingCam());
    const processedCoords = processCoordinates(absoluteX, absoluteY);
    const target = s2w(camPos, processedCoords.x, processedCoords.y);

    const dir = subVector3(target, camPos);
    const from = addVector3(camPos, mulNumber(dir, 0.05));
    const to = addVector3(camPos, mulNumber(dir, 300));

    const ray = native.startExpensiveSynchronousShapeTestLosProbe(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0);
    return native.getShapeTestResult(ray, false, null, null, null);
}
