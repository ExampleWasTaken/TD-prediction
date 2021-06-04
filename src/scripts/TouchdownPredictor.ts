export class TouchdownPredictor {
    // This class assumes a right triangle. 
    // All variables are named after standart triangle names.

    private a: number; // Actual distance to runway

    private b: number; // Radio altitude

    private c: number; // Ground distance to runway

    private alpha: number; // 90°

    private beta: number; // FPA

    private gamma: number; // = alpha - beta

    private touchdownPoint: number[];

    constructor(ra: number, fpa: number) {
        this.a = NaN;
        this.b = ra;
        this.c = NaN;
        this.alpha = 90;
        this.beta = fpa;
        this.gamma = this.alpha - this.beta;
        this.touchdownPoint = [];
    }

    predictTouchdown(): number[] {
        this.c = this.b / Math.tan(this.radToDeg(this.beta));   
        this.a = Math.sqrt(Math.pow(this.b, 2) + Math.pow(this.c, 2));
        
        this.touchdownPoint.push(Math.round(this.a), Math.round(this.b), Math.round(this.c));
        
        return this.touchdownPoint;
    }

    private radToDeg(radians: number): number {
        return radians / (180 / Math.PI);
    }
}