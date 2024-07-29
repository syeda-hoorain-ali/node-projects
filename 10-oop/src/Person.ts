class Person {
    private personality;

    constructor() {
        this.personality = "Mystery";
    }

    public askQuestion(answer: number) {
        switch (answer) {
            case 1:
                this.personality = 'Extravert'
                break;

            case 2:
                this.personality = 'Introvert'
                break;

            default:
                this.personality = 'You are still mystery'
                break;
        }
    }

    public getPersonality() {
        return this.personality;
    }
}

export default Person;