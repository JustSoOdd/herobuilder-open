import ReverseMap from '../helpers/ReverseMap';

var SkillConstants = {
  'Skill1': 0,
  'Skill2': 1,
  'Skill3': 2,
  'Skill4': 3,
  'Focus': 4
};

var ReverseSkillConstants = ReverseMap(SkillConstants);

export default {
  SkillConstants,
  ReverseSkillConstants
};
