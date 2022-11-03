// 1.
function toString<T>(data: T): string {
  if (Array.isArray(data)) {
    return data.toString();
  }
  switch (typeof data) {
    case 'string':
      return data;
    case 'number':
    case 'symbol':
    case 'bigint':
    case 'boolean':
    case 'function':
      return data.toString();
    case 'object':
      return JSON.stringify(data);
    default:
      return undefined;
  }
}

// 2.
interface ID {
  id: number;
}

function sortObjects<T extends ID>(data: T[], type: 'asc' | 'desc' = 'asc'): T[] {
  return data.sort((a: T, b: T) => {
    switch (type) {
      case 'asc':
        return a.id - b.id;
      case 'desc':
        return b.id - a.id;
    }
  });
}

// 3.
// Необходимо написать функцию группировки, которая принимает массив объектов
// и его ключ, производит группировку по указанному ключу и возращает
// сгруппированный объект.
//     Пример:
// ``` js
// [
// 	{ group: 1, name: 'a' },
// 	{ group: 1, name: 'b' },
// 	{ group: 2, name: 'c' },
// ];
// ```
//
// При группироке по 'group' ---->
//
// ``` js
// {
// 	'1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
// 	'2': [ { group: 2, name: 'c' } ]
// }
// ```

interface IGroupObjectResult<T> {
  [key: string]: T[];
}

type key = string | number | symbol;

function groupByKey<T extends Record<key, any>>(data: T[], key: keyof T): IGroupObjectResult<T> {
  return data.reduce((result: IGroupObjectResult<T>, item) => {
    if (result[item[key]]) {
      result[item[key]].push(item);
    } else {
      result[item[key]] = [item];
    }
    return result;
  }, {});
}

// check
const testParam = [
  { group: 1, name: 'a' },
  { group: 1, name: 'b' },
  { group: 2, name: 'c' },
];

console.log(groupByKey(testParam, 'group'));
