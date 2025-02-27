module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:vue/essential",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {   
    "no-console": "warn",          
    "semi": ["warn", "always"],    
    "indent": ["warn", 2],         
    "quotes": ["warn", "single"],  
    "vue/no-unused-vars": "warn",  
    "vue/html-indent": ["warn", 2]  

    }
};
