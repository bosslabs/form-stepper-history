import StepperData from "@/modules/formStepper/classes/StepperData";
import Vue from "vue";

export default {
    namespaced: true,
    state() {
        return {
            stepperHistory: [],
            currentFormStepState: "",
            persist: false,
            states: {},
            transitions: [],
            startValues: {}
        }
    },
    actions: {
        setConfig({commit}, settings){
            commit("SET_CONFIG", settings)
        },
        moveForward({commit}){
            commit("MOVE_FORWARD")
        },
        moveBack({commit}){
            commit("MOVE_BACK")
        },
        reset({commit}){
            commit("RESET")
        },
    },
    mutations: {
        SET_CONFIG(state, settings){
            if (settings.persist){
                state.persist = settings.persist;
            }
            if(settings.transitions){
                state.transitions = settings.transitions;
            }
            if(settings.start){
                state.stepperHistory.push(new StepperData({
                    type: settings.start,
                }))
                state.currentFormStepState = settings.start;
            }
            state.startValues = settings;
        },
        MOVE_FORWARD(state){
            let transitionData = state.transitions.find(
                element => element.identifier == state.currentFormStepState
            )
            let newTransitionType = transitionData.getNextTransitionState();

            if(newTransitionType == null){
                console.log("Form Stepper : Invalid transition Value")
            } else {
                state.currentFormStepState = newTransitionType;
                state.stepperHistory.push(new StepperData({
                    type: newTransitionType,
                }))
            }
        },
        MOVE_BACK(state){
            if(!state.persist){
                state.stepperHistory.splice(state.stepperHistory.length-1, 1);
                if(state.stepperHistory[state.stepperHistory.length-1]){
                    state.currentFormStepState = state.stepperHistory[state.stepperHistory.length-1].type;
                }
            }
        },
        RESET(state){
            state.currentFormStep = state.startValues.start;
            state.stepperHistory = []
        },
        UPDATE_TRANSITIONS(state, newTransitions){
            for (let i = 0; i < newTransitions.length; i++) {
                Vue.set(state.transitions, i, newTransitions[i]);
            }
        }
    },
    getters: {
        currentFormStepState(state){
            return state.currentFormStepState;
        },
        stepperHistory(state){
            return state.stepperHistory;
        }
    }
}