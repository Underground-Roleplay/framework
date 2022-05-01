import * as alt from 'alt-client';
import * as natives from 'natives';
import Core from '../main';

const list = [];

const getEntity = async (id, type, pos, data) => {
    if (!list[`${id}_${type}`]) {
        const localId = await createEntity(type, pos, data, id);
        list[`${id}_${type}`] = {
            id: id,
            type: type,
            pos: pos,
            data: data,
            local: localId,
        };
        return list[`${id}_${type}`];
    }
    if (
        !data &&
        !list[`${id}_${type}`].local &&
        pos === list[`${id}_${type}`].pos
    ) {
        list[`${id}_${type}`].local = await createEntity(
            list[`${id}_${type}`].type,
            list[`${id}_${type}`].pos,
            list[`${id}_${type}`].data
        );
        return list[`${id}_${type}`];
    }
    if (!list[`${id}_${type}`].local && list[`${id}_${type}`].pos !== pos) {
        console.log(pos);
        list[`${id}_${type}`].pos = pos;
        list[`${id}_${type}`].local = await createEntity(
            list[`${id}_${type}`].type,
            list[`${id}_${type}`].pos,
            list[`${id}_${type}`].data
        );
        return list[`${id}_${type}`];
    }
    return list[`${id}_${type}`];
};

const createEntity = async (type, pos, data, id = undefined) => {
    if (type === 1) {
        const pedId = await createPed(pos, data);
        return pedId;
    }
    if (type === 2) {
        const markerTimer = createMarker(pos, data);
        return markerTimer;
    }
};

const updatePos = async (id, type, pos) => {
    destroyEntity(id, type);
    getEntity(id, type, pos);
};

const createMarker = (pos, data) => {
    if (!data.type && data.type !== 0) throw new Error('Missing parameters');
    const marker = alt.everyTick(() => {
        natives.drawMarker(
            data.type,
            pos.x,
            pos.y,
            pos.z,
            data.dirx || 0,
            data.diry || 0,
            data.dirz || 0,
            data.rotx || 0,
            data.roty || 0,
            data.rotz || 0,
            data.scalex || 2.5,
            data.scaley || 2.5,
            data.scalez || 2.5,
            data.r,
            data.g,
            data.b,
            data.a,
            data.bobAndDown || false,
            data.faceCamera || true,
            data.p19 || 2,
            data.rotate || false,
            data.textureDict || undefined,
            data.textureName || undefined,
            data.drawOnEnts || false
        );
    });
    return marker;
};
const getClosesItems = () => {
    let item = dropList.find((i) => {
        let dist = alt.Player.local.pos.distanceTo(i.pos);
        if (dist <= 1.5) {
            return i;
        }
    });
    if (!item) return;
    alt.emitServer('pickupItem', item.id);
};

const createPed = async (pos, data) => {
    if (!data.pedType || !data.modelHash) return;
    await Core.Functions.RequestModel(data.modelHash);
    const ped = natives.createPed(
        data.pedType,
        data.modelHash,
        pos.x,
        pos.y,
        pos.z,
        data.pedHeading,
        false,
        false
    );
    natives.clearPedTasksImmediately(ped);
    natives.setEntityInvincible(ped, true);
    natives.setBlockingOfNonTemporaryEvents(ped, true);
    natives.freezeEntityPosition(ped, true);
    return ped;
};

const destroyEntity = (id, type) => {
    if (!list[`${id}_${type}`]) return;
    if (type === 1) {
        const { local } = list[`${id}_${type}`];
        natives.deletePed(local);
        list[`${id}_${type}`].local = undefined;
    }
    if (type === 2) {
        const { local } = list[`${id}_${type}`];
        alt.clearEveryTick(local);
        list[`${id}_${type}`].local = undefined;
    }
};

let dropList = [];

alt.onServer('dropList', (data) => {
    dropList = data;
});

alt.everyTick(() => {
    for (let i = 0; i < dropList.length; i++) {
        let itemPos = new alt.Vector3(
            dropList[i].pos.x,
            dropList[i].pos.y,
            dropList[i].pos.z - 0.7
        );
        let dist = alt.Player.local.pos.distanceTo(itemPos);
        if (dist <= 3) {
            Core.Utils.drawMarker(itemPos, {
                type: 21,
                dirx: 0,
                diry: 0,
                dirz: 0,
                rotx: 0,
                roty: 180,
                rotz: 0,
                scalex: 0.25,
                scaley: 0.25,
                scalez: 0.25,
                r: 0,
                g: 200,
                b: 0,
                a: 50,
                bobAndDown: false,
                faceCamera: true,
                p19: 2,
                rotate: 0,
                textureDict: 0,
                textureName: 0,
                drawOnEnts: false,
            });
            Core.Utils.drawText(
                `${dropList[i].name} x${dropList[i].amount}`,
                itemPos,
                0,
                0.4
            );
        }
    }
});
alt.onServer('pikItem', () => {
    Core.Functions.loadAnim('pickup_object');
    Core.Functions.playAnim('pickup_object', 'pickup_low', 1000, 1);
});

export default {
    getEntity,
    createPed,
    destroyEntity,
    updatePos,
    createMarker,
    getClosesItems,
};
