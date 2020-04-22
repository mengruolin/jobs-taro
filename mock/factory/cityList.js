const Mock = require("mockjs");

const Random = Mock.Random;

const cityKey = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G']

const cityHot = {
  id: '@increment',
  name: '@city'
}

const cityList = {
  id: '@increment',
  'title|+1': cityKey,
  'key|+1': cityKey,
  'items|1-3': cityHotRandom()
}

function cityHotRandom (count = 6) {
  let res = []
  for (let i = 0; i < count; i++)
    res.push(cityHot)

  return Mock.mock(res)
}

module.exports = {
  randomMulti: (number = cityKey.length / 2) => {
    let res = [];
    for (let i = 0; i < number; i++) res.push(cityList);
    return Mock.mock(res);
  },
  cityHotRandom,
}