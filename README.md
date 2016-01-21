# Form-Validator

**A bunch of form input validation functions I made because I thought they'd be useful :)**


The form I use from the demo is from the [forms section](http://jaypatel.co/sideSites/wc/#frms/) my [Web-Components Page](http://jaypatel.co/sideSites/wc/). You can also visit the [GitHub](https://github.com/sum-kcid/Web-Components) repo for the Web-Components.

*You may find the functions in `DEMO/ValidationResultHandlers.js` useful if you plan on using the forms from my Web-Components page*






##The Files

* `validators.min.js` contains all the validator functions compressed into one file
* You can find individually compressed validator functions in the `Individually Compressed JS` folder
* And of course, the uncompresssed validator functions are in the `Uncompressed JS` folder
* `DEMO/view.js`, `DEMO/view.html` and `DEMO/validationResultHandlers.js` - *(I really like my camelCase haha)* - are the files you're going to want to check for the demo






##The Validator Functions

**All functions return objects, except stringMatcher(...).**

The `isSuccess` property of this object will let you determine if validation was successful or not.

*Some returned objects also contain an `err` property which provides a number pertaining to a type of error. To figure out what each number means, see below*





| Jump to a function | File the function is in|
| -------------------|------------------------|
| [charCounter(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#charcountertxt-min-max-ignspace-ignlinebrs-totrim--charcounterjs)| charCounter.js |
| [emailValidator(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#emailvalidatoremail--emailjs)| email.js |
| [fileValidator(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#filevalidatorfile-minsize-maxsize-filetype--filejs)| file.js |
| [fullNameValidator(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#fullnamevalidatorfullname--namejs)| name.js |
| [firstOrLastNameValidator(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#firstorlastnamevalidatorinput--namejs)| name.js |
| [passwordValidator(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#passwordvalidatorpassword-min-max-limspchars-requirements--passwordjs)| password.js |
| [stringMatcher(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#stringmatcherstrarr--passwordjs)| password.js |
| [urlValidator(...)](https://github.com/sum-kcid/Form-Validator/blob/master/README.md#urlvalidatorurl--urljs)| url.js |






####charCounter(txt, min, max, ignSpace, ignLineBrs, toTrim) | charCounter.js
*In the DEMO I use this for validation a textarea containing a description*

* **'txt': string** is the txt to count on
* **'min, max': integer** are the minimum and maximum limits of the text
  * pass a `falsey` value in either if no limit in that category (ex. pass false for min if no minimum)
* **'ignSpace': boolean** if you would like to ignore spaces from the character count, pass `true`
* **'ignLineBrs': boolean** if you would like to ignore line breaks from the character count, pass `true`
* **'toTrim': boolean** if you would like the function to trim spaces before counting characters, pass `true`

**If error**, there will be an `err` property passed in the object returned
* If `charCounter(...).err == 0`, that means character count is less than the minimum specified
* If `charCounter(...).err == 1`, that means character count is more than the maximum specified






####emailValidator(email) | email.js
*Note this sort of validation is just for aesthetics
  *if you would like to actually validate it, you can do it through services like http://www.mailgun.com/email-validation*
* **'email': string** is the email string to be validated

This function does not give any error details (no `err` property in the object returned)






####fileValidator(file, minSize, maxSize, fileType) | file.js

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


**If error**, there will be an `err` property passed in the object returned
* If `fileValidator(...).err == 0`, that means the file size is less than the minimum specified
* If `fileValidator(...).err == 1`, that means the file size is greater than the maximum specified
* If `fileValidator(...).err == 2`, that means the file extension does not match the extensions specified






####fullNameValidator(fullName) | name.js
**It's often good to not check the name much at all**, as it's tough to make assumptions but this very leniently tests for names and makes sure there is *more than one word entered* -- no international support (with unicode)
* **'fullName': string** the string of the full name to be tested

This function does not give any error details (no `err` property in the object returned)






####firstOrLastNameValidator(input) | name.js
**It's often good to not check the name much at all**, as it's tough to make assumptions but this very leniently tests for names and makes sure there *is only one word entered* -- no international support (with unicode)
* **'input': string** the string of the first or last name to be tested


**If error**, there will be an `err` property passed in the object returned
* If `firstOrLastNameValidator(...).err == 0`, that means there was more than one word entered
* If `firstOrLastNameValidator(...).err == 1`, that means the string failed regex test (numbers in name, etc)






####passwordValidator(password, min, max, limSpChars, requirements) | password.js
This lets you customisably validate an entered password

* **'password': string** is the password to validate on
* **'min, max': integer** are the minimum and maximum limits of the text, pass false in either if no limit on that respective end
* **'limSpChars': boolean** if you would like to only allow use of `! @ # $ % ^ & * ( ) _`  as alpha numeric chars, pass `true`
* **'requirements': array of booleans** -->
 * *[0]:* if true, pw must contain at least one lowercase and one uppercase letter
 * *[1]:* if true, pw must contain at least one number
 * *[2]:* if true, pw must contain at least on non-alphanumeric character
 * *[3]:* if true, pw must not contain spaces

**If error**, there will be an `err` property passed in the object returned
* If `passwordValidator(...).err == 0`, password fails min char requirement
* If `passwordValidator(...).err == 1`, password fails max char requirement
* * If `passwordValidator(...).err == 2`, password contains special characters outside of `! @ # $ % ^ & * ( ) _`
* * If `passwordValidator(...).err == 3`, password does not contain at least one lowercase and one uppercase letter
* * If `passwordValidator(...).err == 4`, password does not contain at least one lowercase and one uppercase letter
* * If `passwordValidator(...).err == 5`, password does not contain at least one non-alphanumeric
* * If `passwordValidator(...).err == 6`, password contains spaces






####stringMatcher(strArr) | password.js
Pass an array of strings and this just checks if all the strings match each other. In the `DEMO`, I use this for the *password confirmation* input.
**This returns a boolean. Not the `isSuccess` object**

*Make sure you pass at least two strings in the function.*

This function does not give any error details (no `err` property in the object returned)






####urlValidator(url) | url.js
A url validator
* **'url': string** is the url to validate on

This function does not give any error details (no `err` property in the object returned)







##Feedback
Let me know if I've made any oversights while validating, mistakes in my code or if you have improvement ideas. Constructive feedback is always welcome :)


##License
It's MIT. View [here](https://github.com/sum-kcid/Form-Validator/blob/master/LICENSE) :)
