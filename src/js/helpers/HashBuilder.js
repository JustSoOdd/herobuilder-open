import {
    HashConstants, ReverseHashConstants
}
from '../constants/HashConstants';
import {
    SkillConstants, ReverseSkillConstants
}
from '../constants/SkillConstants';

const SKILL_TYPE = 0;
const UPGRADE_PATH = 1;

/**
 *
 */
function skillTypeInList(skillType, list) {
    var listIndex = -1;

    list.some((item, index) => {
        if (skillType === item[SKILL_TYPE]) {
            listIndex = index;
            return true;
        }
        return false;
    });

    return listIndex;
};

/**
 * Returns a hash of skills and talents
 * @param {array} skills
 * @param {array} talents
 * @returns {string}
 */
function create(skills, talents) {
    var skill, skillHash, i, talent, hash = '';

    for (i = 2; i <= 11; i++) {
        talent = 0;
        skill = skills[i - 2];

        if (talents[i]) {
            talent = talents[i];
        }

        if (skill) {
            hash += HashConstants[(skill[UPGRADE_PATH] + SkillConstants[skill[SKILL_TYPE]] + talent).substr(-3)];
        } else {
            hash += HashConstants[('00' + talent)];
        }
    }

    return hash;
}

/**
 * Unpacks a hash and returns an object of arrays
 * @param {string} hash
 * @returns {object}
 */
function unpack(hash) {
    var i,
        hashCode,
        skillCode,
        upgradeIndex,
        skills = [],
        skillType,
        firstUpgrade,
        talents = {
            3: null,
            5: null,
            7: null,
            9: null
        };

    hash = hash.split('');

    for (i = 2; i <= 11; i++) {
        firstUpgrade = null;
        hashCode = ReverseHashConstants[hash[i - 2]];

        // Process skill
        // We reverse it to stay constant with how we store skills
        skillCode = hashCode.substr(0, 2).split('').reverse();
        skillType = ReverseSkillConstants[skillCode[SKILL_TYPE]];
        if ((upgradeIndex = skillTypeInList(skillType, skills)) > -1) {
            firstUpgrade = skills[upgradeIndex];
            skills.push([skillType, firstUpgrade[UPGRADE_PATH] + skillCode[UPGRADE_PATH]]);
        } else {
            skills.push([skillType, skillCode[UPGRADE_PATH]]);
        }

        if (talents.hasOwnProperty(i)) {
            talents[i] = parseInt(hashCode.substr(-1), 10);
        }
    }

    return {
        skills,
        talents
    }
}

export default {
    create,
    unpack
}