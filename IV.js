/* ******************************************* * 
 * IV.js 1.6                                   *
 * http://dadleyy.github.com/IV.js/            *
 * (c) 2013 Danny Hadley under the MIT license *
 * ******************************************* */ 
(function () {

    "use strict";
    
    
    var /* private variables */
        formClass      = "form.IValidate",
        submitClass    = "input.IValidator",
        inputSelection = "input.IValidate",
        inputFilters,
        inputDefaults,
        
        /* private functions */
        getInputFilter,
        getInputDefault,
        validate,
        focal,
        blurer,
        keyManager,
        
        /* IV constructor */
        _IV = function( ) { };
        
    
/* inputDefaults
 *
 * The default values that will be used based 
 * on the filter 
*/    
inputDefaults = {
    "name"     : "Name",
    "password" : "pass",
    "email"    : "Email Address", 
    "any"      : ""
}

/* inputFilters
 *
 * Filter functions 
*/    
inputFilters = {
    "any"    : function( element ){
        return $(element).val() != "" 
                    && $(element).val() != getInputDefault( element );  
    },
    "min" : function( element ){
        var minlen = ( $(element).data("minlength") ) ? $(element).data("minlength") : 4;
        return $(element).val().length > minlen 
                    && inputFilters["any"](element);
    },
    "max" : function( element ){
        var maxlen = ( $(element).data("maxlength") ) ? $(element).data("maxlength") : 20;
        return $(element).val().length < maxlen 
                    && inputFilters["any"](element);
    },
    "minmax" : function( element ){
      return inputFilters["min"](element) 
                    && inputFilters["max"](element);
    },
    "email"  : function( element ){
        return $(element).val().match(/.+\@.+\..+/) != null 
                    && inputFilters["any"](element);   
    },
    "phone"  : function( element ){
        return $(element).val().match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) != null 
                    && inputFilters["any"](element);
    }
};

/* getInputFilter
 *
 * Gets the filter name to be applied
 * @param {object} element A DOM element
*/
getInputFilter = function ( element ) {
    var dt = (element.dataset) ? element.dataset.filter : $(element).attr("data-filter");
    return dt || "any";
};


/* getInputDefault
 *
 * Gets the placeholder of the element
 * @param {object} element A DOM element
*/
getInputDefault = function ( element ) {
    var dt = (element.dataset) ? element.dataset.placeholder : $(element).attr("data-placeholder");
    return inputDefaults[dt] || dt || "";
};

/* validate
 *
 * Checks to see if all input elements
 * pass the filter that was specified by
 * their data-filter attribute
*/
validate = function ( ) {
    var error  = false,
        values = { };
    
    for(var i = 0; i < this.inputs.length; i++){
        var input = this.inputs[i],
            type  = getInputFilter( input ),
            valid = (inputFilters[type]) ? inputFilters[type](input) : inputFilters["any"](input),
            name  = $(input).attr("name") || i;
        
        if(!valid){ 
            $(input).addClass("errored").val( getInputDefault( input ) ); 
            error = true; 
        } else {
            values[name] = $(input).val();
        }
    };
    
    if(error){ return; }
    
    return (this.submitcallback && this.submitcallback.call(this,values)) || this.$form.submit( );
};

/* focal
 *
 * onFocus event handler for all input
 * elements to check for errored or
 * original values
*/
focal = function ( ) {
    $(this).removeClass("errored");  
    if( $(this).val() == getInputDefault( this ) ){
        $(this).val('');
    }
};

/* blurer
 *
 * onBlur event handler for all input
 * elements 
*/
blurer = function ( ) {
    if( $(this).val() == '' ){
        $(this).val( getInputDefault( this ) );
    }
}

/* keyManager
 * 
 * Handles the enter key while focused on an input box
 * and clearing out old errored input boxes
 * @param {object} evt The event passed
*/
keyManager = function ( evt ) {
   
   if( evt.keyCode == 13 ){
       validate.bind(this)();
       return evt.preventDefault && evt.preventDefault();
   }
   
   var tar  = evt.target,
       $tar = $(tar);
    
    if( $tar.hasClass("errored") ){
        $tar.val('').removeClass("errored");
    }   
   
};


/* _IV
 * The constructor for IV form validation
 * objects. 
 *
 * @constructor 
 * @param {object} opts Optional initialization
*/
_IV = function ( opts ) {
    opts = opts || { };
    
    this.form   = opts.form || $(document).find(formClass).get()[0];
    this.$form  = $(this.form);
    
    this.submit  = opts.submit || this.$form.find(submitClass).get()[0];
    this.$submit = $(this.submit);
    
    this.$inputs = this.$form.find(inputSelection);
    this.inputs  = this.$inputs.get();
    
    this.submitcallback = opts.callback || false;
    
    var self = this;
    this.$inputs.focus(function () { return focal.apply(this); })
                .keydown(function (evt) { return keyManager.apply(self,[evt]); })
                .blur(function () { return blurer.apply(this); });
                
    this.$submit.click(function (evt) { return validate.apply(self); });
        
    this.reset( );    
    
    if( this.submitcallback ){
        this.$form.submit(function (evt) { return evt.preventDefault && evt.preventDefault(); });
    }
};

_IV.prototype = {
    version : "1.6",
    constructor : _IV,

    reset : function ( ) {
        this.$inputs.each(function () {
            $(this).val( getInputDefault( this ) );
        });
    }
};

/* globalize the IV constructor */
window.IV = _IV;

})( );