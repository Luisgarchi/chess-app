export class MoveVector {

    /* Constructor */ 

    constructor(rankComponent, fileComponent, restricted, activated){
        this.rankComponent = rankComponent
        this.fileComponent = fileComponent
        this.restricted = (typeof restricted === 'undefined') ? 0 : restricted
        this.activated = (typeof activated === 'undefined') ? true : activated
    }

    /* Methods */

    getUnitVector() {

        /* Function finds the unit vector */

        const vectorRank = this.rankComponent
        const vectorFile = this.fileComponent

        // Check for horizontal movement in rank, true: set vector = [+/- 1, 0] 
        if (vectorFile == 0){
            return new MoveVector(vectorRank / Math.abs(vectorRank), 0, 0) 
        } 
        // Check for horizontal movement in file: true set vector = [0, +/- 1]
        else if (vectorRank == 0){
            return new MoveVector(0, vectorFile / Math.abs(vectorFile), 0)
        }
        // Otherwise there are two components to vector.
        else {
            // Find the unit vector by dividing by the greatsest common divisor
            const divideByGCD = greatestCommonDivisor(vectorFile, vectorRank)
            return new MoveVector(vectorRank/divideByGCD , vectorFile/divideByGCD, 0)
        }
    }
}


function greatestCommonDivisor(a, b) {

    // A recursive function that returns the Greates Common Divisor using Euclids algorithm
    return (!b) ? a : greatestCommonDivisor(b, a%b)
}