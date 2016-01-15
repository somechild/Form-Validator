# Form-Validator

**A bunch of form input validation functions I made because I thought they'd be useful :)**


The form I use from the demo is from the [forms section](http://jaypatel.co/sideSites/wc/#frms/) my [Web-Components Page](http://jaypatel.co/sideSites/wc/). [GitHub](https://github.com/sum-kcid/Web-Components)

*You may find the functions in `DEMO/ValidationResultHandlers.js` useful if you plan on using the forms from my Web-Components page*


##The Files

* `validators.min.js` contains all the validator functions compressed into one file
* You can find individually compressed validator functions in the `Individually Compressed JS` folder
* And of course, the uncompresssed validator functions are in the `Uncompressed JS` folder
* `DEMO/view.js`, `DEMO/view.html` and `DEMO/validationResultHandlers.js` - *(I really like my camelCase haha)* - are the files you're going to want to check for the demo

##The Validator Functions

*They all return objects.* the 'isSuccess' property of this object will let you determine if validation was successful or not.
**Some returned objects also contain an 'err' property which provides a number pertaining to a type of error. To figure out what each number means, see below**
