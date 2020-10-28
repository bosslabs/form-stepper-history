import {TransitionRuleCheckType} from "@/modules/formStepper/classes/TransitionRuleCheckType";

export default class TransitionRuleCheck{
    constructor(valueToCheck = null, valueToCompare = null, type = TransitionRuleCheckType.EQUALS) {
        this.valueToCheck = valueToCheck;
        this.valueToCompare = valueToCompare;
        this.type = type;
    }
    check(){
        if(!this.type){
            return true;
        }
        switch (this.type){
            case TransitionRuleCheckType.EQUALS:
                return this.valueToCheck === this.valueToCompare;
        }
        return true;
    }
}