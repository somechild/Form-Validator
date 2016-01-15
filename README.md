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

**They all return objects.** the 'isSuccess' property of this object will let you determine if validation was successful or not.
*Some returned objects also contain an 'err' property which provides a number pertaining to a type of error. To figure out what each number means, see below*

###charCounter(txt, min, max, ignSpace, ignLineBrs, toTrim)
*In the DEMO I use this for validation a textarea containing a description*

* **'txt': string** is the txt to count on
* **'min, max': integer** are the minimum and maximum limits of the text
  * pass a `falsey` value in either if no limit in that category (ex. pass false for min if no minimum)
* **'ignSpace': boolean** if you would like to ignore spaces from the character count, pass `true`
* **'ignLineBrs': boolean** if you would like to ignore line breaks from the character count, pass `true`
* **'toTrim': boolean** if you would like the function to trim spaces before counting characters, pass `true`

**If error**, there will be an `'err'` property passed in the object returned
* If `charCounter(...).err == 0`, that means character count is less than the minimum specified
* If `charCounter(...).err == 1`, that means character count is more than the maximum specified



###emailValidator(email)
*Note this sort of validation is just for aesthetics
  *if you would like to actually validate it, you can do it through services like http://www.mailgun.com/email-validation*
* **'email': string** is the email string to be validated



###fileValidator(file, minSize, maxSize, fileType)

For validating file objects

* **'file': file object** can be passed by $('fileSelector')[0].files[0]
  * *note .files returns an array, you will have to test one file at a time*
* * **'minSize, maxSize': integer** limits in bytes
  * set minSize and/or maxSize to falsey values if no min/max respectively
  * ex. for no min, but 3mb do: `fileValidator(file, false, 3145728, false);`
* * **'fileType': string OR array**
  * Pass falsey value for any file type
  * If you are passing a string, you are limited to the following presets `'image', 'text', 'pdf'`
    * I just validate against the most common image extensions or text file extensions or .pdf extension depending on which string you've passed
  * If you would like to enter a list of **custom file extensions** to validate against, pass an array of strings with the custom extensions
    * You can also pass 'image', 'text' and/or 'pdf' in the array if you would like to test against these presets as well
    * This will let you combine presets with each other or with custom extensions as well
    * *Example of array being passed: * `fileValidator(file, false, 3145728, ['text', 'xls', 'ppt']);`
      * This validates against `.xls`, `.ppt` as well as common text file extensions `doc|docx|log|pages|rtf|txt|wpd|wps|msg|odt|tex`


**If error**, there will be an `'err'` property passed in the object returned
* If `fileValidator(...).err == 0`, that means the file size is less than the minimum specified
* If `fileValidator(...).err == 1`, that means the file size is greater than the maximum specified
* If `fileValidator(...).err == 2`, that means the file extension does not match the extensions specified
