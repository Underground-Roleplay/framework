import * as natives from 'natives';
import * as alt from 'alt-client';

alt.on('connectionComplete', () => {
    let blip = natives.addBlipForCoord(
        5943.5679611650485,
        -6272.114833599767,
        2
    );
    natives.setBlipSprite(blip, 407);
    natives.setBlipScale(blip, 0);
    natives.setBlipAsShortRange(blip, false);
});

let nearIsland = false;

alt.everyTick(() => {
    let distance = alt.Player.local.pos.distanceTo(
        new alt.Vector3(4840.571, -5174.425, 2.0)
    );

    if (distance < 2000) {
        if (!nearIsland) {
            nearIsland = true;
            natives.setIslandHopperEnabled('HeistIsland', true);
            natives.setScenarioGroupEnabled('Heist_Island_Peds', true);
            natives.setAudioFlag('PlayerOnDLCHeist4Island', true);
            natives.setAmbientZoneListStatePersistent(
                'AZL_DLC_Hei4_Island_Zones',
                true,
                true
            );
            natives.setAmbientZoneListStatePersistent(
                'AZL_DLC_Hei4_Island_Disabled_Zones',
                false,
                true
            );
        }
    } else {
        if (nearIsland) {
            nearIsland = false;
            natives.setIslandHopperEnabled('HeistIsland', false);
            natives.setScenarioGroupEnabled('Heist_Island_Peds', false);
            natives.setAudioFlag('PlayerOnDLCHeist4Island', false);
            natives.setAmbientZoneListStatePersistent(
                'AZL_DLC_Hei4_Island_Zones',
                false,
                false
            );
            natives.setAmbientZoneListStatePersistent(
                'AZL_DLC_Hei4_Island_Disabled_Zones',
                false,
                false
            );
        }
    }
    if (nearIsland) {
        natives.setRadarAsExteriorThisFrame();
        natives.setRadarAsInteriorThisFrame(
            alt.hash('h4_fake_islandx'),
            4700.0,
            -5145.0,
            0,
            0
        );
    }
});
