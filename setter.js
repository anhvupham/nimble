module.exports = {
    
    // Myemail@Mail.com --> myemail@mail.com
    lowerCase : function (string) {
        return string.toLowerCase();
    },

    // acme inc --> ACME INC
    upperCase : function (string) {
        return string.toUpperCase();
    },

    // acme inc --> Acme Inc
    titleCase : function (str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

    // lor ipsom. dol amore. --> Lor ipsom. Dol amore.
    sentenceCase : function (string) {
        var sentences = string.split("."),
            out = "",
            i = 0,
            j;

        for(i; i < sentences.length; i+= 1) {
            var spaceput = "",
                spaceCount=sentences[i].replace(/^(\s*).*$/,"$1").length;

            sentences[i]=sentences[i].replace(/^\s+/,"");
            var newstring=sentences[i].charAt(sentences[i]).toUpperCase() + sentences[i].slice(1);
            
            for(j=0; j < spaceCount; j+= 1) {
                spaceput = spaceput + " ";
            }

            out += spaceput + newstring + ".";
         }

         return out.substring(0, out.length - 1);
    },

    // Will try and convert the string to a number
    number : function (string, onNaN ) {
        onNaN = onNaN === undefined ? 0 : onNaN;
        return parseFloat(string) || onNaN;
    },

    // Will remove unsafe tags from a string
    sanitize : function (input) {
        return require('sanitizer').sanitize(input)
    },

    // will call the sanitize method on the input, then send it to the specified converter
    sanitizeAndConvert : function (input, getter) {
        if (this[getter]) {
            return this[getter].call(this, this.sanitize(input));
        } else {
            throw("The setter " + getter + "Does not exist. We must complain very harsh about this.")
        }  
    },
    
    /* 
        Allows you to pinball through the methods, chaining multiple together to create an advanced setter
        usage : pinball("hello world", ['sanitize', 'lowerCase', 'titleCase']);
        this will sanitize, then convert it to lowercase then convert it to title case
    */
    pinball : function (input, methods) {
        while (methods.length) {
            if (this[methods[0]]) {
                input = this[methods[0]].call(this, input);
                methods.shift();
            }
        }

        return input;
    }

}