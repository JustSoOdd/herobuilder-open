import ReverseMap from '../helpers/ReverseMap';

var SkillButtonConstants = {
  'Skill1': "LMB",
  'Skill2': "RMB",
  'Skill3': "Q",
  'Skill4': "E",
  'Focus': "F"
};

var ReverseSkillConstants = ReverseMap(SkillButtonConstants);

export default {
  SkillButtonConstants,
  ReverseSkillConstants
};
