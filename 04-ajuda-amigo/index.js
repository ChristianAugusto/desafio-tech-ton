function validBracesStr(str) {
    if (str.length <= 1) {
        return false;
    }

    const symbols = [
        {
            openning: '(',
            closing: ')'
        },
        {
            openning: '{',
            closing: '}'
        },
        {
            openning: '[',
            closing: ']'
        }
    ];


    function isClosingSymbol(char) {
        const result = symbols.filter(symbol => symbol.closing === char);

        if (result.length >= 0) {
            return result[0];
        }

        return null;
    }


    if (isClosingSymbol(str[0])) {
        return false;
    }



    const stack = [];


    stack.push(str[0]);


    for (let i = 1; i < str.length; i++) {
        const symbol = isClosingSymbol(str[i]);

        if (symbol) {
            if (symbol.openning === stack[stack.length-1]) {
                stack.pop();
            }
            else {
                return false;
            }
        }
        else {
            stack.push(str[i]);
        }
    }

    if (stack.length > 0) {
        return false;
    }


    return true;
}

console.log(validBracesStr('(){}[]'));
console.log(validBracesStr('([{}])'));
console.log(validBracesStr('(}'));
console.log(validBracesStr('[(])'));
console.log(validBracesStr('[({})](]'));
