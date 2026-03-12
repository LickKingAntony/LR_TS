/**
 * 1. Определяем основные интерфейсы.
 * Используем поле 'type' как дискриминант для различения типов в Union.
 */
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

/**
 * 2. Создаем объединение (Union type) для всех возможных личностей.
 */
export type Person = User | Admin;

/**
 * 3. Наш массив данных с явной типизацией.
 */
export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Miriam Rozenbaum', age: 33, role: 'Administrator' }
];

/**
 * 4. Универсальная функция фильтрации с использованием Generics.
 * * Разбор магии типов в аргументах:
 * - <T extends Person['type']>: захватываем конкретную строку 'user' или 'admin'.
 * - Extract<Person, { type: T }>: вытаскивает из Person только тот интерфейс, чей type совпал с T.
 * - Omit<..., 'type'>: исключаем само поле 'type' из критериев поиска (оно уже передано вторым аргументом).
 * - Partial<...>: делает все оставшиеся поля (age, occupation и т.д.) необязательными для поиска.
 */
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

/**
 * 5. Примеры работы программы
 */

// Выведет всех пользователей (users), которым 23 года
const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });

// Выведет всех админов (admins), у которых роль 'Administrator'
const administrators = filterPersons(persons, 'admin', { role: 'Administrator' });

console.log('Users of age 23:');
usersOfAge23.forEach((user) => {
    console.log(` - ${user.name}, ${user.age}, ${user.occupation}`);
});

console.log('\nAdministrators:');
administrators.forEach((admin) => {
    console.log(` - ${admin.name}, ${admin.age}, ${admin.role}`);
});