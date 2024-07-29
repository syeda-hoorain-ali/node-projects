import Person from "./Person.js";

class Student extends Person {

    private _name: string;

    constructor() {
        super ();
        this._name = ''
    }

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value;
    }
}

export default Student;