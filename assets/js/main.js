/* ********************************** * 
 * main.js                            *
 * Example js file for use with IV.js *  
 * ********************************** */
(function () {
    "use strict"; 
    
    var ready,     // DOM onReady function
        validator, // The IV object that will be created 
        callback;  // a callback for submit success
        
/* a callback function */
callback = function ( ) {
    this.$form.append("<span>SUCCESS!</span>"); 
};
        
ready = function ( ) {
    validator = new IV({    
        form     : document.getElementById('example'),                        
        callback : callback
    });
};

$(document).ready( ready );
    
})( )