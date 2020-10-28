export default class Transition{
    constructor(identifier, rules) {
        this.identifier = identifier;
        this.rules = rules;
    }
    getNextTransitionState(){
        let nextLocation = null;

        for(let ruleIndex in this.rules){
            let rule = this.rules[ruleIndex];
            if(nextLocation != null){
                break;
            }
            if(!rule.checks || rule.checks.length === 0){
                nextLocation = rule.to;
                break;
            }
            for(let ruleCheckIndex in rule.checks){
                let ruleCheckToCheck = rule.checks[ruleCheckIndex]
                if(ruleCheckToCheck.check()){
                    nextLocation = rule.to;
                    break;
                }
            }
        }

        if(nextLocation){
            return nextLocation
        }

        console.log("Unable to transition, all rules are invalid")
        return this.identifier;
    }
}