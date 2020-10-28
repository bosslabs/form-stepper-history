export class TransitionRule {
    constructor(to,checks = []) {
        this.to = to;
        this.checks = checks;
    }
}