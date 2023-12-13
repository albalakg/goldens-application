export const STATUSES = [
  'לא פעיל',
  'פעיל',
  'ממתין',
  'בתהליך'
];

export const STATUSES_ENUM = {
  failed: 0,
  succeed: 1,
  pending : 2,
  inProcess: 3
};

export const SUPPORT_STATUSES = [
  'בוטל',
  'הושלם',
  'בטיפול',
];

export const ACTIVE   = 1;
export const INACTIVE = 0

export const SUPPORT_STATUSES_ENUM = {
  [SUPPORT_STATUSES[0]]: 0,
  [SUPPORT_STATUSES[1]]: 1,
  [SUPPORT_STATUSES[2]]: 2,
};

export const USER_CHALLENGE_STATUSES = [
  'לא עבר',
  'הושלם',
  'בבדיקה',
];

export const USER_CHALLENGE_STATUSES_ENUM = {
  failed: 0,
  succeed: 1,
  pending : 2
};

class StatusService {

  getStatusAsNumber(statusName) {
    return STATUSES_ENUM[statusName];
  }
  
  getStatusAsString(statusNumber) {
    return STATUSES[statusNumber];
  }

  getSupportStatusAsNumber(statusName) {
    return SUPPORT_STATUSES_ENUM[statusName];
  }
  
  getSupportStatusAsString(statusNumber) {
    return SUPPORT_STATUSES[statusNumber];
  }

  getChallengeStatusAsNumber(statusName) {
    return USER_CHALLENGE_STATUSES_ENUM[statusName];
  }

  getChallengeStatusAsString(statusNumber) {
    return USER_CHALLENGE_STATUSES[statusNumber];
  }
}

export default new StatusService();
