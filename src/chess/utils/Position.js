export default class Position {

    constructor(file, rank){
        this.file = file
        this.rank = rank
    }

    /* Setters */
    
    set updateFile(newFile) {
        this.file = newFile
    }

    set updateRank(newRank) {
        this.rank = newRank
    }

    /* Methods */

    serialiseUCI() {
        return this.file + this.rank.toString()
    }

    serialiseICCF() {
        return Position.fileToNum(this.file).toString() + this.rank.toString()
    }

    /* Static Methods */

    static compare(positionA, positionB) {
        return ((positionA.file == positionB.file) && (positionA.rank == positionB.rank))
    }

    static includes(positions, position) {
        
        for (let i = 0; i < positions.length; i++){

            const checkPosition = positions[i]

            if (this.compare(checkPosition, position)){
                return true
            }
        }
        return false
    }

    static fileToNum(file) {

        // Get the number representation of the file
        const numberRepresentation = file.charCodeAt(0)
    
        // Get the number to subtract from acording to the starting file
        const startNum = 'a'.charCodeAt(0) -1
    
        return numberRepresentation - startNum
    }

    static numToFile(fileNum) {

        // Get the number starting file number representation
        const startNum = 'a'.charCodeAt(0) - 1
    
        return String.fromCharCode(startNum + fileNum)
    }
    
}