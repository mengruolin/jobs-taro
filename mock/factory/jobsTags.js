const Mock = require("mockjs");

const Random = Mock.Random;

const jobTags = {
  id: '@increment',
  title: '@ctitle(3, 5)'
}

module.exports = {
  randomMulti: (number = 16) => {
    let res = [];
    for (let i = 0; i < number; i++) res.push(jobTags);
    return Mock.mock(res);
  }
}