export const STATUSES = [
  'לא פעיל',
  'פעיל',
  'ממתין',
  'בתהליך'
];

export const STATUSES_ENUM = {
  [STATUSES[0]]: 0,
  [STATUSES[1]]: 1,
  [STATUSES[2]]: 2,
  [STATUSES[3]]: 3
};

export const SUPPORT_STATUSES = [
  'בוטל',
  'הושלם',
  'בטיפול',
];

export const SUPPORT_STATUSES_ENUM = {
  [SUPPORT_STATUSES[0]]: 0,
  [SUPPORT_STATUSES[1]]: 1,
  [SUPPORT_STATUSES[2]]: 2,
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

}

export default new StatusService();
