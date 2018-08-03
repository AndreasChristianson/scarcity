export default (username) => [{
    id: 1,
    hash: '$2a$11$ZfaEz93J/2tz/CuKr6VSteHuHShRwOID8b4nqhojM4HfTdaW5KF/e',
    name: 'admin',
    email: 'admin@scarcity.pessimistic-it.com',
    scope: ['can-listen-to-time']
},{
    id: 5,
    hash: '$2a$11$ZfaEz93J/2tz/CuKr6VSteHuHShRwOID8b4nqhojM4HfTdaW5KF/e',
    name: 'user',
    email: 'user@scarcity.pessimistic-it.com',
    scope: []
}].find((u) => u.name === username);
