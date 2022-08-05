/**
 * All the application custom global methods for easier development
 * Can just register the methods here
*/

/**
 * The application error message with a prefix message for recognize
 * @param {String} message 
*/
export const error = (message) => {
    // add validation to show only in envs that aren't production
    console.error('Application Error: ' + message);
}

/**
 * The application warning message with a prefix message for recognize
 * @param {String} message 
*/
export const warning = (message) => {
    // add validation to show only in envs that aren't production
    console.warn('Application Warning: ' + message);
}

/**
 * add hours to date
*/
Date.prototype.addHours = function(hour) {
    this.setTime(this.getTime() + (hour * 60 * 60 * 1000));
    return this;
}