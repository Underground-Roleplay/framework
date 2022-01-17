import * as alt from 'alt-server';
import Core from '../main';

import db from 'mysql2-wrapper';

import { executeSync } from '../libs/utils';

const saveJobdata = (source) => {
    if (!source) return;
    const { job, ssn } = source.playerData;
    db.execute(
        'UPDATE characters SET job = ? WHERE ssn = ?',
        [JSON.stringify(job), ssn],
        undefined,
        alt.resourceName
    );
};

const setJob = (source, job, grade) => {
    const jobName = job.toLowerCase();
    if (!Core.Shared.Jobs[jobName]) return;
    const jobgrade = Core.Shared.Jobs[jobName].grades[grade];
    if (jobgrade) {
        source.playerData.job.name = jobName;
        source.playerData.job.grade = {};
        source.playerData.job.grade.name = jobgrade.name;
        source.playerData.job.grade.level = parseInt(grade);
        source.playerData.job.payment = jobgrade.payment || 30;
        source.playerData.job.isboss = jobgrade.isboss || false;
    } else {
        source.playerData.job.name = jobName;
        source.playerData.job.grade = {};
        source.playerData.job.grade.name = 'No grades';
        source.playerData.job.grade.level = 0;
        source.playerData.job.payment = 30;
        source.playerData.job.isboss = false;
    }
    saveJobdata(source);
    Core.Functions.emitPlayerData(source, 'job', source.playerData.job);
    alt.emitClient(
        source,
        'notify',
        'error',
        'JOB SYSTEM',
        Core.Translate('JOB.UPDATED', { jobName: job })
    );
};

const setDuty = (source) => {
    if (source.playerData.job.onDuty) {
        source.playerData.job.onDuty = false;
        alt.emitClient(
            source,
            'notify',
            'success',
            Core.Translate('JOB.LABEL', {
                jobname: source.playerData.job.name.toUpperCase(),
            }),
            Core.Translate('JOB.JOB_ENDED')
        );
    } else {
        source.playerData.job.onDuty = true;
        alt.emitClient(
            source,
            'notify',
            'success',
            Core.Translate('JOB.LABEL', {
                jobname: source.playerData.job.name.toUpperCase(),
            }),
            Core.Translate('JOB.JOB_STARTED')
        );
    }
    saveJobdata(source);
    Core.Functions.emitPlayerData(source, 'job', source.playerData.job);
};

export default { saveJobdata, setJob, setDuty };
