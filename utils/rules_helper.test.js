const { formatString, buildRuleFromRawString } = require("./rules_helper")

describe('Rules Helper functions test', () => {
    test('Format string to replace operator ', () => {

        expect(formatString('a&b')).toBe('a,b')
    })

    test('Create rule with no operator', () => {
        const result = buildRuleFromRawString('006');
        console.log(result)
        expect(result).toStrictEqual({ "missing_some": [1, ["006", "dummy"]] })
    })

    test('Create rule with single AND "&" operator : 016G&060G', () => {

        expect(buildRuleFromRawString('016G&060G')).toStrictEqual({ "missing": ["016G", "060G"] })
    })


    test('Create rule with single AND "," operator : 016L,060L', () => {

        expect(buildRuleFromRawString('016G,060G')).toStrictEqual({ "missing": ["016G", "060G"] })
    })

    test('Create rule with single OR "|" operator : 001|003|004|008', () => {

        expect(buildRuleFromRawString('001|003|004|008')).toStrictEqual({ "missing_some": [1, ["001", "003", "004", "008", "dummy"]] })
    })


    test('RuCreate rulele with AND & OR operators : 016G|060G&008', () => {

        expect(buildRuleFromRawString('016G|060G&008')).toStrictEqual({
            "if": [
                { "missing_some": [1, ["016G", "060G", "dummy"]] },
                { "missing": ["008"] },
                "OK"
            ]
        })
    })

    test('Create rule with AND , OR & ()  operators : 022A|(022B&022C)', () => {

        expect(buildRuleFromRawString('022A|(022B&022C)')).toStrictEqual({
            "if": [
                { "missing_some": [1, ["022A", "dummy"]] },
                { "missing": ["022B", "022C"] },
                "OK"
            ]
        })
    })

})