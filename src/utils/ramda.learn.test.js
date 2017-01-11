import R from 'ramda'

describe('@List utils', () => {
  test('adjust - Выполняет функцию над элементом массива с указанным индексом', () => {
    expect(R.adjust(R.add(10), 1, [1, 2, 3])).toEqual([1, 12, 3])
    expect(R.adjust(R.add(10), 2, [1, 2, 3])).toEqual([1, 2, 13])
    expect(R.adjust(item => item * 2, 2, [1, 2, 3])).toEqual([1, 2, 6])
    expect(R.adjust(i => ({ ...i, checked: true }), 2, [{ a: 1 }, {}, {}])).toEqual([{ a: 1 }, {}, { checked: true }])
  })
  test('all - Проверяет условие на всех элементах массива', () => {
    expect(R.all(R.equals(10), [10, 10, 10])).toBeTruthy()
    expect(R.all(R.equals(10), [10, 11, 10])).toBeFalsy()
    expect(R.all(item => item.checked, [{ checked: true }, { checked: true }])).toBeTruthy()
    expect(R.all(item => item.checked, [{ checked: false }, { checked: true }])).toBeFalsy()
  })
  test('any - true если любой элемент массива удовлетворяет условию', () => {
    //
    expect(R.any(R.equals(10), [9, 10, 9])).toBeTruthy()
    expect(R.any(item => item.checked, [{ checked: false }, { checked: true }])).toBeTruthy()
  })
  test('none - true если все не удовлетворяют условию', () => {
    expect(R.none(R.equals(10), [9, 10, 9])).toBeFalsy()
    expect(R.none(item => item.checked, [{ checked: false }, { checked: true }])).toBeFalsy()
  })
  test('aperture - разбивает массив на массивы указанной длины "окна", сдвигая "окно" по элементу', () => {
    expect(R.aperture(3, [1, 2, 3, 4, 5, 6, 7])).toEqual([[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]])
  })
  test('append, prepend - добавляет элемент в массив в начало (конец) (похож на push)', () => {
    expect(R.append(3, [1, 2])).toEqual([1, 2, 3])
    expect(R.append({ test: 1 }, [1, 2])).toEqual([1, 2, { test: 1 }])
    expect(R.append('appendMe', [])).toEqual(['appendMe'])
    expect(R.append(['appendMe'], [1, 2])).toEqual([1, 2, ['appendMe']])

    expect(R.prepend(3, [1, 2])).toEqual([3, 1, 2])
  })
  test('chain - выполняет функцию над элементами массива и соединяет результаты в массив результатов (flatMap)', () => {
    expect(R.chain(i => i * 2, [1, 2])).toEqual([2, 4])
    expect(R.chain(i => [i * 2, i * 3], [1, 2])).toEqual([2, 3, 4, 6])
    expect(R.chain(R.append, R.head)([1, 2, 3])).toEqual([1, 2, 3, 1])
    expect(R.chain(R.append, R.last)([1, 2, 3])).toEqual([1, 2, 3, 3])
  })
  test('concat - Соединяет строки или массивы', () => {
    expect(R.concat('ABC', 'DEF')).toEqual('ABCDEF')
    expect(R.concat('ABC', [1, 2])).toEqual('ABC1,2')
    expect(R.concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
  })
  test('contains - true если найден в строке или масиве, или массиве объектов', () => {
    expect(R.contains('B', 'ABCDEF')).toBeTruthy()
    expect(R.contains('B', ['A', 'B', 'CDEF'])).toBeTruthy()
    expect(R.contains({ check: true }, ['A', { check: true }, 'CDEF'])).toBeTruthy()
    expect(R.contains(10, [9, 10, 9])).toBeTruthy()
  })
  test('drop, dropLast - отбрасывает N первых (последних) элементов строки или массива', () => {
    expect(R.drop(2, 'ABCDEF')).toEqual('CDEF')
    expect(R.drop(3, 'ABCDEF')).toEqual('DEF')
    expect(R.drop(2, ['A', 'B', 'CDEF'])).toEqual(['CDEF'])

    expect(R.dropLast(2, 'ABCDEF')).toEqual('ABCD')
    expect(R.dropLast(3, 'ABCDEF')).toEqual('ABC')
    expect(R.dropLast(2, ['A', 'B', 'CDEF'])).toEqual(['A'])
  })
  test('dropWhile, dropLastWhile - отбрасывает первые (последние) элементы, пока выполняется условие', () => {
    expect(R.dropWhile(i => i !== '-', 'ABC-DEF').join('')).toEqual('-DEF')
    expect(R.dropLastWhile(i => i !== '-', 'ABC-DEF').join('')).toEqual('ABC-')
    expect(R.dropWhile(i => i < 3, [1, 2, 3, 4, 5, 6])).toEqual([3, 4, 5, 6])
  })
  test('dropRepeats - отбрасывает соседствующие дубликаты', () => {
    expect(R.dropRepeats([1, 1, 2, 2, 1])).toEqual([1, 2, 1])
  })
  test('dropRepeatsWith - отбрасывает соседствующие дубликаты результатов функции', () => {
    expect(R.dropRepeatsWith(R.eqBy(Math.abs), [1, -1, 2, -2])).toEqual([1, 2])
  })
  test('filter - фильтрует элементы массива, строки или объектов', () => {
    expect(R.filter(i => i < 2, [3, -1, 2, -2])).toEqual([-1, -2])
    expect(R.filter(i => i.checked, [{ title: 'a', checked: false }, { title: 'b', checked: true }]))
      .toEqual([{ title: 'b', checked: true }])
    expect(R.filter(i => i === 'a', { title: 'a', hint: 'a', checked: true }))
      .toEqual({ title: 'a', hint: 'a' })
    expect(R.filter(i => i !== 'a', 'abcdefabcdef').join('')).toEqual('bcdefbcdef')
  })
  test('reject - возращает все элементы, кроме удовлетворяющего условию (обратен filter)', () => {
    expect(R.reject(item => item === 3, [1, 2, 3, 4])).toEqual([1, 2, 4])
  })
  test('partition - разбивает массив на 2 группы удовлетворяющий условию и нет', () => {
    expect(R.partition(R.contains('s'), ['a', 'bs', 'c', 'ds'])).toEqual([['bs', 'ds'], ['a', 'c']])
  })
  test('find, findLast - возращает первый (последний) найденный элемент массива', () => {
    const items = [{ id: 1 }, { id: 2, findMe: true }, { id: 3 }, { id: 2, findMe: false }]
    expect(R.find(item => item.id === 2, items)).toEqual({ id: 2, findMe: true })
    expect(R.findLast(item => item.id === 2, items)).toEqual({ id: 2, findMe: false })
  })
  test('findIndex, findLastIndex - возращает индекс первого (последнего) найденного функцией элемента массива', () => {
    const items = [{ id: 1 }, { id: 2, findMe: true }, { id: 3 }, { id: 2, findMe: false }]
    expect(R.findIndex(item => item.id === 2, items)).toEqual(1)
    expect(R.findLastIndex(item => item.id === 2, items)).toEqual(3)
  })
  test('indexOf, lastIndexOf - поиск индекса элемента', () => {
    expect(R.indexOf(3, [1, 2, 3, 4])).toEqual(2)
    expect(R.indexOf(5, [1, 2, 3, 4])).toEqual(-1)
  })
  test('flatten - все вложенные массивы переносит в один "плосский" массив', () => {
    expect(R.flatten([1, [2, 3], [4, [5, [6]]]])).toEqual([1, 2, 3, 4, 5, 6])
  })
  test('forEach - вызывает функцию для каждого элемента, в том числе удаленным или с пропущенным индексом', () => {
    let buffer = 0
    const sum = value => { buffer += value; return buffer }
    R.forEach(sum, [1, 2, 3])
    expect(buffer).toEqual(6)

    const items = new Array(4)
    expect(items).toEqual([undefined, undefined, undefined, undefined])
    let bufferCount = 0
    const count = () => { bufferCount += 1; return bufferCount }
    R.forEach(count, items)
    expect(bufferCount).toEqual(4)

    bufferCount = 0
    items.forEach(count) // Array.forEach не проходит по undefined в массиве
    expect(bufferCount).toEqual(0)
  })
  test('fromPairs - массив из массивов пар [ключ, значение] – превращает в объект', () => {
    expect(R.fromPairs([['id', 1], ['title', 2]])).toEqual({ id: 1, title: 2 })
  })
  test('groupBy - группирует по текстовому ключу, который возвращает функция', () => {
    const items = [{ tag: 'red' }, { tag: 'green' }, { tag: 'red' }, {}]
    expect(R.groupBy(item => item.tag, items)).toEqual({
      green: [{ tag: 'green' }],
      red: [{ tag: 'red' }, { tag: 'red' }],
      undefined: [{}]
    })
  })
  test('indexBy - превращает массив в объект, где ключи возращены функцией (правые элементы перезаписывают левые с тем же ключом)', () => {
    expect(R.indexBy(item => item.id, [{ id: 1, title: '1' }, { id: 2, title: '2' }])).toEqual({ 1: { id: 1, title: '1' }, 2: { id: 2, title: '2' } })
  })
  test('groupWith - разбивает массив на подмассивы, где соседние элементы удовлетворяют результату функции сравнения', () => {
    expect(R.groupWith(R.equals, ['a', 'a', 'b', 'b', 'c'])).toEqual([['a', 'a'], ['b', 'b'], ['c']])
    expect(R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])).toEqual([[0], [1, 1], [2], [3, 5], [8], [13, 21]])
  })
  test('groupWith - разбивает массив на подмассивы, где соседние элементы удовлетворяют результату функции сравнения', () => {
    expect(R.groupWith(R.equals, ['a', 'a', 'b', 'b', 'c'])).toEqual([['a', 'a'], ['b', 'b'], ['c']])
  })
  test('reduce, reduceRight - копит результаты выполнения функции в аккумуляторе, предоставляя его и элемент в функцию', () => {
    expect(R.reduce((a, b) => a + b, 0, [1, 2, 3, 4])).toEqual(0 + 1 + 2 + 3 + 4)
    expect(R.reduceRight((a, b) => a + b, 9, [1, 2, 3, 4])).toEqual(4 + 3 + 2 + 1 + 9)
  })
  test('reduceBy - копит результаты группируя их при помощи функции возращающей строку', () => {
    const reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), [])
    const namesBySex = reduceToNamesBy(item => item.sex)
    const students = [{ name: 'Lucy', sex: 'woman' },
                      { name: 'Drew', sex: 'man' },
                      { name: 'Bart', sex: 'man' }]
    expect(namesBySex(students)).toEqual({ man: ['Drew', 'Bart'], woman: ['Lucy'] })
  })
  test('reduced - выполняет reduce для элементов удовлетворяющих условию', () => {
    expect(R.reduce(R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)), 0, [1, 2, 3, 4, 5])).toEqual(10)
  })
  test('reduceWhile - выполняет reduce для элементов удовлетворяющих условию', () => {
    expect(R.reduceWhile((acc, item) => item % 2 === 1, R.add, 111, [1, 4, 5, 6])).toEqual(112)
  })
  test('head, last - первый (последний) элемент массива', () => {
    expect(R.head(['first', 'second', 'last'])).toEqual('first')
    expect(R.head('abcdef')).toEqual('a')

    expect(R.last(['first', 'second', 'last'])).toEqual('last')
    expect(R.last('abcdef')).toEqual('f')
  })
  test('tail, init - все элементы кроме первого (последнего)', () => {
    expect(R.tail(['first', 'second', 'last'])).toEqual(['second', 'last'])
    expect(R.tail('abcdef')).toEqual('bcdef')

    expect(R.init(['first', 'second', 'last'])).toEqual(['first', 'second'])
    expect(R.init('abcdef')).toEqual('abcde')
  })
  test('insert, insertAll - вставляет элемент (элементы) в место указанное индексом', () => {
    expect(R.insert(2, 'insertme', [1, 2, 3, 4])).toEqual([1, 2, 'insertme', 3, 4])
    expect(R.insertAll(2, ['insertme', 'me_too'], [1, 2, 3, 4])).toEqual([1, 2, 'insertme', 'me_too', 3, 4])
  })
  test('intersperse - вставляет разделитель после каждого элемента массива', () => {
    expect(R.intersperse('-', ['a', 'b', 'c'])).toEqual(['a', '-', 'b', '-', 'c'])
  })
  test('into - применяет функцию "трансдюсер" к массиву и добавляет к "аккамулятору" (использует reduce)', () => {
    const transducer = R.compose(R.map(R.add(1)), R.take(2))
    const numbers = [1, 2, 3, 4]
    expect(R.into([], transducer, numbers)).toEqual([2, 3])

    const transducer2 = R.map(R.add(2))
    expect(R.into(['a', 'b'], transducer2, numbers)).toEqual(['a', 'b', 3, 4, 5, 6])
  })
  test('join - соединяет список в строку', () => {
    expect(R.join('', ['j', 'o', 'i', 'n'])).toEqual('join')
  })
  test('length', () => {
    expect(R.length(['j', 'o', 'i', 'n'])).toEqual(4)
    expect(R.length([])).toEqual(0)
    expect(R.length({ a: 1, b: 2 })).toEqual(NaN)
    expect(R.length(undefined)).toEqual(NaN)
  })
  test('map - функция применяется к каждому элементу и результат заменяет элемент в массиве (объекте)', () => {
    expect(R.map(item => item * 2, [1, 2, 3])).toEqual([2, 4, 6])
    expect(R.map(item => item * 2, { a: 1, b: 2, c: 3 })).toEqual({ a: 2, b: 4, c: 6 })
  })
  test('mapAccum, mapAccumRight - комбинация map и reduce, предоставляет функции аккумулятор и текущий элемент', () => {
    const digits = ['1', '2', '3', '4']
    const appender = (a, b) => [a + b, a + b]
    expect(R.mapAccum(appender, 0, digits)).toEqual(['01234', ['01', '012', '0123', '01234']])
    expect(R.mapAccumRight(appender, 5, digits)).toEqual([['12345', '2345', '345', '45'], '12345'])

    const word = 'bcde'
    expect(R.mapAccum(appender, 'a', word)).toEqual(['abcde', ['ab', 'abc', 'abcd', 'abcde']])
    expect(R.mapAccumRight(appender, 'f', word)).toEqual([['bcdef', 'cdef', 'def', 'ef'], 'bcdef'])
  })
  test('mergeAll - объединяет массив объектов в один объект (правая часть побеждает)', () => {
    expect(R.mergeAll([{ foo: 1 }, { bar: 2 }, { baz: 3 }])).toEqual({ foo: 1, bar: 2, baz: 3 })
    expect(R.mergeAll([{ foo: 1 }, { bar: 2 }, { baz: 3 }, { foo: 2 }])).toEqual({ foo: 2, bar: 2, baz: 3 })
  })
  test('nth - возращает элемент из массива с указанным индексом похож на list[index], но умеет проходить справа', () => {
    expect(R.nth(2, ['a', 'b', 'c'])).toEqual('c')
    expect(R.nth(-1, ['a', 'b', 'c'])).toEqual('c')
    expect(R.nth(-4, ['a', 'b', 'c'])).toEqual(undefined)
  })
  test('pair - первые два аргумента объединяются в массив, остальные игнорируются', () => {
    expect(R.pair('a', 'b', 'c')).toEqual(['a', 'b'])
  })
  test('pluck - отбирает значения указанного ключа из объектов в массиве и возращает массив этих значений', () => {
    expect(R.pluck('id', [{ id: 1, title: '1' }, { id: 2, title: '2' }])).toEqual([1, 2])
  })
  test('range - возращает массив чисел от (включительно) и до (не включительно)', () => {
    expect(R.range(3, 6)).toEqual([3, 4, 5])
  })
  test('remove - удаляет из массива указанные элементы', () => {
    expect(R.remove(2, 3, [1, 2, 3, 4, 5, 6, 7, 8])).toEqual([1, 2, 6, 7, 8])
  })
  test('repeat - создает массив с повторяющимся указанным элементом', () => {
    expect(R.repeat('hi', 3)).toEqual(['hi', 'hi', 'hi'])
  })
  test('reverse - зеркалит массив', () => {
    expect(R.reverse([1, 2, 3])).toEqual([3, 2, 1])
  })
  test('scan - тоже что и reduce, но возращает все промежуточные значения', () => {
    const numbers = [1, 2, 3, 4]
    const factorials = R.scan(R.multiply, 1, numbers)
    expect(factorials).toEqual([1, 1, 2, 6, 24])
  })
  test('sequence', () => {
    expect().toEqual()
  })
  test('slice', () => {
    expect().toEqual()
  })
  test('sort', () => {
    expect().toEqual()
  })
  test('splitAt', () => {
    expect().toEqual()
  })
  test('splitEvery', () => {
    expect().toEqual()
  })
  test('splitWhen', () => {
    expect().toEqual()
  })
  test('take, takeLast', () => {
    expect().toEqual()
  })
  test('takeLastWhile', () => {
    expect().toEqual()
  })
  test('takeWhile', () => {
    expect().toEqual()
  })
  test('times', () => {
    expect().toEqual()
  })
  test('transduce', () => {
    expect().toEqual()
  })
  test('transpose', () => {
    expect().toEqual()
  })
  test('traverse', () => {
    expect().toEqual()
  })
  test('unfold', () => {
    expect().toEqual()
  })
  test('uniq', () => {
    expect().toEqual()
  })
  test('uniqBy', () => {
    expect().toEqual()
  })
  test('uniqWith', () => {
    expect().toEqual()
  })
  test('unnest', () => {
    expect().toEqual()
  })
  test('update', () => {
    expect().toEqual()
  })
  test('without', () => {
    expect().toEqual()
  })
  test('xprod', () => {
    expect().toEqual()
  })
  test('zip', () => {
    expect().toEqual()
  })
  test('zipObj', () => {
    expect().toEqual()
  })
  test('zipWith', () => {
    expect().toEqual()
  })

})
