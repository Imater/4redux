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
  test('aperture - разбивает массив на массивы указанной длины "окна", сдвигая "окно" по элементу', () => {
    expect(R.aperture(3, [1, 2, 3, 4, 5, 6, 7])).toEqual([[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]])
  })
  test('append - добавляет элемент в массив (похож на push)', () => {
    expect(R.append(3, [1, 2])).toEqual([1, 2, 3])
    expect(R.append({ test: 1 }, [1, 2])).toEqual([1, 2, { test: 1 }])
    expect(R.append('appendMe', [])).toEqual(['appendMe'])
    expect(R.append(['appendMe'], [1, 2])).toEqual([1, 2, ['appendMe']])
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
  test('find, findLast - возращает первый (последний) найденный элемент массива', () => {
    const items = [{ id: 1 }, { id: 2, findMe: true }, { id: 3 }, { id: 2, findMe: false }]
    expect(R.find(item => item.id === 2, items)).toEqual({ id: 2, findMe: true })
    expect(R.findLast(item => item.id === 2, items)).toEqual({ id: 2, findMe: false })
  })
  test('findIndex, findLastIndex - возращает индекс первого (последнего) найденного элемента массива', () => {
    const items = [{ id: 1 }, { id: 2, findMe: true }, { id: 3 }, { id: 2, findMe: false }]
    expect(R.findIndex(item => item.id === 2, items)).toEqual(1)
    expect(R.findLastIndex(item => item.id === 2, items)).toEqual(3)
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
  })
})
