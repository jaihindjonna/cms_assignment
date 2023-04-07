

const OPERATORS_ALL_START = [',', '|', '('];
const OPERATORS = {
    AND: ',',
    OR: '|',
    OF_START: '(',
    OF_END: ')'
}

const OPERATORS_ALT = {
    AND: '&'
}

const RULE_WORD = {
    AND: 'missing',
    OR: 'missing_some'
}


const singleOperatorRuleBuild = function (taskString, operator) {
    // Check if has only one operator and get it if yes else throw error

    // split by the operator and set the object by operator
    const splitArr = taskString.split(operator).filter(el => !!el);

    if (OPERATORS.AND === operator) {
        return { [RULE_WORD.AND]: splitArr }
    } else if (OPERATORS.OR === operator) {
        return { [RULE_WORD.OR]: [1, [...splitArr, "dummy"]] }
    }

    return;

}


// recursive function to create the task
const buildRule = function (taskString, isMulti = false, isNested = true) {

    // Check if has only one operator

    // > get first index of all the operators >> filter if not exists >> sort in ascending order
    const operatorIndex = OPERATORS_ALL_START.map(op => ({ operator: op, index: taskString.indexOf(op) })).filter(({ index }) => index >= 0).sort(({ index: a }, { index: b }) => a - b)

    const [{ operator } = { operator: OPERATORS.OR }, { operator: secondOpertor, index: secondIndex } = {}] = operatorIndex;

    if (operatorIndex.length <= 1) {
        // Single operator 
        return isMulti ? [singleOperatorRuleBuild(taskString, operator)] : singleOperatorRuleBuild(taskString, operator);
    }


    // multi operator string
    // if secondOpertor is 

    return isNested ?
        {
            "if": [
                // singleOperatorRuleBuild(taskString.substring(0, secondIndex), operator),
                // ...(secondIndex ? buildRule(getSubstring(), true, false) : [])
                ...multiOperatorRule({ taskString, operator, secondIndex, secondOpertor, isMulti: true, isNested: false })
                , "OK"
            ]
        } : [
            ...multiOperatorRule({ taskString, operator, secondIndex, secondOpertor, isMulti, isNested })
        ];

}

const multiOperatorRule = function ({ taskString, operator, secondIndex, secondOpertor, isMulti, isNested }) {

    function getSubstring() {
        if (secondOpertor === OPERATORS.OF_START) {
            // build rule till the index of OF_END 
            return taskString.substring(secondIndex + 1, taskString.indexOf(OPERATORS.OF_END))
        }

        return taskString.substring(secondIndex)
    }

    return [
        singleOperatorRuleBuild(taskString.substring(0, secondIndex), operator),
        ...(secondIndex ? buildRule(getSubstring(), isMulti, isNested) : []),
        ...(secondOpertor === OPERATORS.OF_START && taskString.indexOf(OPERATORS.OF_END) + 1 < taskString.length ?
            buildRule(taskString.substring(taskString.indexOf(OPERATORS.OF_END) + 1), isMulti, isNested) : [])
    ]



}


const formatString = function (taskString) {
    // format string >> replace all '&' with ','
    let formatedString = taskString;
    Object.keys(OPERATORS_ALT).forEach(key => {
        formatedString = formatedString.replaceAll(OPERATORS_ALT[key], OPERATORS[key])
    })

    return formatedString;
}


const buildRuleFromRawString = function (taskString) {
    return buildRule(formatString(taskString))

}


module.exports = {
    formatString,
    buildRule,
    buildRuleFromRawString
}


