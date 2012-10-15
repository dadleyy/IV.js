var IV = (function(){

/* private stuff */
var formClass      = "form.IValidate",
    submitClass    = "input.IValidator",
    inputSelection = "input.IValidate",
    inputFilters   = {
        "any"    : function( element ){
            return $(element).val() != "" && $(element).val() != getInputDefault( element );  
        },
        "length" : function( element ){
            var len = ( (element.dataset) ? element.dataset.minlength || $(element).data("minlength") ) || 4;
            return $(element).val().length > len && inputFilters["any"](element);
        },
        "email"  : function( element ){
            return $(element).val().match(/.+\@.+\..+/) != null && inputFilters["any"](element);   
        },
    },
    inputDefaults  = {
        "name"     : "Name",
        "password" : "pass",
        "email"    : "Email Address", 
        "any"      : ""
    }

function getInputFilter( element ){
    var dt = (element.dataset) ? element.dataset.filter : $(element).attr("data-filter");
    return dt || "any";
};

function getInputDefault( element ){
    var dt = (element.dataset) ? element.dataset.placeholder : $(element).attr("data-placeholder");
    return inputDefaults[dt] || dt || "";
};

function validate( ){
    var error = false;
    for(var i = 0; i < this.inputs.length; i++){
        var input = this.inputs[i],
            type  = getInputFilter( input ),
            valid = inputFilters[type](input);
            
        if(!valid){ 
            $(input).addClass("errored").val( getInputDefault( input ) ); 
            error = true; 
        }
    };
    if(error){ return; }
    
    this.submitcallback.apply(this);
    this.$form.submit( );
};

function focal( ){
    $(this).removeClass("errored");  
    if( $(this).val() == getInputDefault( this ) ){
        $(this).val('');
    }
};

function keyManager( evt ){
   if( evt.keyCode == 13 ){
       if( evt.preventDefault ){
           evt.preventDefault( );
       }
       validate.bind(this)();
       return;
   }
   var tar  = evt.target,
       $tar = $(tar);
    
    if( $tar.hasClass("errored") ){
        $tar.val('').removeClass("errored");
    }   
   
};

/* public stuff */
return function( opts ){
    opts = opts || { };
    
    this.form   = opts.form || $(document).find(formClass).get()[0];
    this.$form  = $(this.form);
    
    this.submit  = opts.submit || this.$form.find(submitClass).get()[0];
    this.$submit = $(this.submit);
    
    this.$inputs = this.$form.find(inputSelection);
    this.inputs  = this.$inputs.get();
    
    this.submitcallback = opts.callback || function(){ };
    
    this.$inputs.each(function(){
        $(this).val( getInputDefault( this ) );
    });

    var self = this;
    this.$inputs.focus(function(){ return focal.apply(this); })
                .keydown(function(evt){ return keyManager.apply(self,[evt]); });
                
    this.$submit.click(function(evt){ return validate.apply(self); });
};

})( );