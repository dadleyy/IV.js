IV.js
====================


About
---
IV.js is a simple javascript libraries for validating inputs before sending them off to the server. The  library has several different filters that can be applied to input values during the process.


Dependencies
-------

In order to be able to use this library, you will need to include a copy of [jQuery][1] in your code. If you are unfamiliar with the DOM or including libraries, the order that you include scripts matters. It is ideal to use this order:

    <script type="text/css" src="/your/path/to/jquery.js"></script>
    <script type="text/css" src="/your/path/to/IV.js"></script>


Initialization
====

There are multiple ways to attach the benefits of this library to your page, each with it's own niche in the front-end world.



**Built-in Object Selection**
----

In a situation where there is only one form on the page (*a login screen/sign up/forgot password*), the `IV.js` library can be initialized simply by placing the following code in a set of document `<script>` tags or in a separate javascript file that you are using.:



*Javascript*

	var validator;
    $(document).ready(function(){
    	validator = new IV();
    });


In order for this method to work, the page's html would need to include the appropriate input elements and form class names:

*HTML*

	<form action="/somethin" method="post" class="IValidate">
	
		<input type="text" name="email" class="IValidate" data-filter="email" data-placeholder="email" >
	   	
	   	<input type="password" name="password" class="IValidate" data-filter="any">
	   	   
	    <input type="button" class="IValidator" value="login">
	
	</form>

-----

* **How it finds the form**

   In this example, the IV.js library has been instantiated with the most minimal information, so it does it's best to find the important information blocks on the page. To do so, it uses it's default class structure, finding the elements that match:
	
   * Form : form.IValidate	
   * Inputs : input.IValidate
   * Submitter : input.IValidator
   
 
----

* **No submit button?**


   Instead of using an `<input type="submit">` for the form action trigger, the IV.js library works best with a `<input type="button">`. Regardless, **the button must be labeled as the `IValidator` in it's class name.** Once the library has caught that button being clicked, it will fire the submit button on its `form` element (supposing it passes validation)
   
----
 
 * **What's up with the data attributes?**
  
   The IV.js library requires that some of these DOM attributes are set in order to know which filter you would like to apply to the input itself. For example, specifying an `<input … data-filter="minmax">` element would mean that the library will run the 'minmax' filter on the value of the input once the form has been submited.  
 
----

**Specified Object Selection**
----

Tutorial coming soon.

**Custom Submit Callback**
----

Tutorial coming soon.





  [1]: http://jquery.com/
  