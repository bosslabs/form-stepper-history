export default class StepperData{
    type;
    timestamp;
    constructor({type}){
        if(type){
            this.type = type;
        }
        this.timestamp = Date.now()
    }
}
