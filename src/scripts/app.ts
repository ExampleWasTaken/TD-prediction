import { TouchdownPredictor } from "./TouchdownPredictor.js";

class App {
    private ra: number;
    private fpa: number;

    constructor(ra: number, fpa: number) {
        this.ra = ra;
        this.fpa = fpa;
    }

    callPredictor(): number[] {
        const tdp = new TouchdownPredictor(this.ra, this.fpa);
        const prediction = tdp.predictTouchdown();
        return prediction;
    }
}

const raField = document.getElementById("ra") as HTMLInputElement;
const fpaField = document.getElementById("fpa") as HTMLInputElement;
const errorMsgField = document.getElementById("error-msg-field") as HTMLParagraphElement;
const computeButton = document.getElementById("compute-button") as HTMLInputElement;

let invalidInput: boolean = false;

raField.addEventListener("keydown", () => {
    const regex = new RegExp(/\D/g);
    if (regex.test(raField.value) && raField.value !== "") {
        invalidInput = true;
        errorMsgField.innerHTML = `Expected number but got '${raField.value}'.`;
        return;
    } else {
        errorMsgField.innerHTML = "";
        invalidInput = false;
    }
});

fpaField.addEventListener("keydown", () => {
    const regex = new RegExp(/\D/g);
    if (regex.test(fpaField.value) && fpaField.value !== "") {
        invalidInput = true;
        errorMsgField.innerHTML = `Expected number but got '${raField.value}'.`;
        return;
    } else {
        errorMsgField.innerHTML = "";
        invalidInput = false;
    }
});

computeButton.addEventListener("click", (event) => {
    console.clear(); // FIXME: remove clear 
    event.preventDefault();
    if (invalidInput) {
        return;
    } else if (raField.value == "" || fpaField.value == "") {
        errorMsgField.innerHTML = "Both fields are required!";
        return;
    }
    errorMsgField.innerHTML = "";
    
    console.log(new App(+raField.value, +fpaField.value).callPredictor());  
});