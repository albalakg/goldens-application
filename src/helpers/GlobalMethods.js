/**
 * All the application custom global methods for easier development
 * Can just register the methods here
*/

/**
 * The application error message with a prefix message for recognize
 * @param {String} message 
*/
window.error = (message) => {
    console.error('Application Error: ' + message);
}

/**
 * The application warning message with a prefix message for recognize
 * @param {String} message 
*/
window.warning = (message) => {
    console.warn('Application Warning: ' + message);
}