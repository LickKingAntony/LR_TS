
export interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

export interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}


export type Person = User | Admin;


export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Miriam Rozenbaum', age: 33, role: 'Administrator' }
];


export function filterPersons<T extends Person['type']>(
    persons: Person[],
    personType: T,
    criteria: Partial<Omit<Extract<Person, { type: T }>, 'type'>>
): Extract<Person, { type: T }>[] {
    return persons
        .filter((person): person is Extract<Person, { type: T }> => person.type === personType)
        .filter((person) => {
            const criteriaKeys = Object.keys(criteria) as (keyof typeof criteria)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName as keyof typeof person] === criteria[fieldName];
            });
        });
}


const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });


const administrators = filterPersons(persons, 'admin', { role: 'Administrator' });

console.log('Users of age 23:');
usersOfAge23.forEach((user) => {
    console.log(` - ${user.name}, ${user.age}, ${user.occupation}`);
});

console.log('\nAdministrators:');
administrators.forEach((admin) => {
    console.log(` - ${admin.name}, ${admin.age}, ${admin.role}`);
});