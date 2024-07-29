export type Student = {
    rollNo: string;
    name: string;
    fatherName: string;
    course: string;
    balance: number;
    fees: number;
    isPaid: boolean;
}

export let students: Student[] = [
    {
        rollNo: '00001',
        name: "Okasha",
        fatherName: "Ijaz",
        course: "Blockchain",
        balance: 10000,
        fees: 2000,
        isPaid: false,
    },
    {
        rollNo: '00002',
        name: "Atia",
        fatherName: "Khan",
        course: "Internet of Things",
        balance: 8500,
        fees: 1000,
        isPaid: true,
    },
    {
        rollNo: '00003',
        name: "Mantsha",
        fatherName: "Amjad",
        course: "Artificial Intelligence",
        balance: 5000,
        fees: 1500,
        isPaid: false,
    },
    {
        rollNo: '00004',
        name: "Hoorain",
        fatherName: "Amjad",
        course: "Cloud Native and Mobile Web",
        balance: 6500,
        fees: 1000,
        isPaid: true,
    }
]

export const updateStudents = (newStudents: Student[]) => {
    students = newStudents;
}

export const titleCase = (string: string) => {
    let words = string.split(' ');
    words = words.map(word => (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()));
    return words.join(' ');
}

export const sleep = async () => {
    await new Promise(r => setTimeout(r, 2000));
}
