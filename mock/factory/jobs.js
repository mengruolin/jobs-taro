var Mock = require("mockjs");

var Random = Mock.Random;

// 公司 Logo
const companyLogo =  [
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/16/BB/CgotOVytchOANgN6AAA8EfNN6yU555.png", 
  "https://www.lgstatic.com/thumbnail_100x100/i/image3/M01/5D/0E/CgpOIF4JXnWAVzkbAABs-yZFn_U463.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/4E/BD/Cgp3O1esORGAO1-rAAAIJJwGyjw584.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/59/4C/CgpEMlmC85OAACxcAAAGgFzPKzs411.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/45/7A/CgqKkVeIevmAXlmnAADQ2vLkvgU931.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/98/55/CgotOVu-7sGAAhf-AABzbAALq7A126.png",
  "https://www.lgstatic.com/thumbnail_100x100/image2/M00/05/99/CgqLKVX3lS-AIawiAAEHGEQxN_Y456.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M00/1B/63/CgotOVoCv-eAPNQcAARRTfkzqqo936.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/01/4D/Cgp3O1ZmuIaADPCpAAAdVuLr56I821.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/99/BB/Cgp3O1ihGAGAKUgUAAG55-tWef418.jpeg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/7C/4F/CgotOVtzzoqAPAFHAAA0ElFHKeg399.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/83/43/CgotOVuFEMWAPR_pAAAJ1HH6Y-8447.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/8D/BF/CgoB5l2Ao52ALSFOAAMsMW7BK1Q145.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M00/29/2B/CgotOVomTSOAUlmvAACCdW7K2uI782.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/6C/B2/CgoB5ltPA2uAWzctAAHPGcUXsGI185.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/32/52/CgoB5lzdGueAacOGAAC2R7KXAu0992.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/AA/74/CgoB5l3TtjqATAMnAABUJY37Yns101.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/49/C4/CgotOV0HM-OAfkWWAAAU6q4o73Y021.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/49/C4/CgotOV0HM-OAfkWWAAAU6q4o73Y021.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/2D/A3/CgpFT1k0-4WATGDeAAA5HRbo708156.jpg",
  "https://www.lgstatic.com/thumbnail_160x160/i/image/M00/05/61/CgpFT1jbeUSAQ0v5AAKFSRB9DSg742.png"
]

// 公司背景图
const companyBgs = {}

// 公司标签
const companyTags = [
  '五险一金',
  '年终奖',
  '股票期权',
  '带薪年假',
  '员工旅游',
  '节日福利'
]

// 岗位名称
const jobName = [
  '架构师（web前端）',
  'web前端',
  'WEB前端工程师',
  '资深WEB前端开发工程师',
  '高级前端开发工程师'
] 

// 岗位标签
const jobTags = [
  'Gulp',
  'Java',
  'JavaScript',
  'MySql',
]

// 公式规模
const companyScales = [
  '未融资',
  '天使轮',
  'A轮',
  'B轮',
  '上市公司'
]

//
const experiences = [
  '经验不限',
  '在校/应届',
  '1 - 3 年',
  '3 - 5 年',
  '5年以上'
]

//
const educations = [
  '不限',
  '高中',
  '专科',
  '本科',
  '研究生'
]

const companyTag = [
  '计算机软件',
  '服务外包'
]

const jobDescribe = `岗位职责：
1、持续关注Web开发技术的发展，掌握新技术的核心点，从中挑选适合我们自己的新技术；
2、建立前端的技术标准和规范，推动开发、测试、部署等最佳实践并监督执行；
3、负责PC Web、H5、小程序开发框架和工具的设计和维护；
4、参与产品的功能开发，指导web开发工程师的开发工作，协助解决难点问题；
5、定期开展Web开发工程师培训，促进团队成员的进步。
技能要求：
1、有至少三年以上前端开发经验，有前端架构设计经验；
2、深入掌握JS语言, 以及ES6, 7特性. 对Typescript或Flow等静态化工具熟练掌握；
3、对前端主流框架，包括Vue，React等有深刻理解；
4、熟练掌握gulp，webpack，browserify等工具，并且对实现细节有研究;
5、熟悉移动网络通信机制，对Socket通信，TCP/IP和HTTP有较深刻理解和经验；
6、有服务端的开发经验，有Java, NodeJS的项目经验优先考虑；
7、具有良好的沟通能力，有较强的独立工作能力和解决问题的能力。`

// 工作列表
const jobList = {
  id: '@increment',
  'jobsName|1': jobName,
  companyName: '@ctitle(5, 10)',
  'companyLogo|+1': companyLogo,
  wages: '@integer(3, 20)',
  'jobTags': jobTags,
  updateTime: '@time("hh:mm")',
}

// 职位详细信息

const jobInfo = {
  id: '@increment',
  companyInfo: {
    companyName: '@ctitle(15, 20)',
    'companyLogo|1': companyLogo,
    crewSize: '@integer(20, 200)',
    'companyScale|1': companyScales,
    'companyTag|1': companyTag,
    'companyAddress': '@county(true)',
  },
  'jobName|1': jobName,
  'jobTags': jobTags,
  'jobDescribe': jobDescribe, //'@cparagraph(30, 40)',
  isStart: '@boolean',
  isApply: '@boolean',
  publishr: '@ctitle(2, 3)',
  publishTime: '@time("hh:mm")',
  address: '@province',
  'experience|1': experiences,
  'education|1': educations,
  'jobSate|1': ['兼职', '实习', '全职'],
  wages: '@integer(3, 20)',
  'jobTags': jobTags,
}

const jobScreening = {
  'localAddress': ((count = 10) => {
    let res = []
    for (let i = 0; i < count; i++)
      res.push('@county()')

    return Mock.mock(res)
  })(),
  'education': ['不限', '高中', '专科', '本科', '研究生', '博士'],
  'experience': ['不限', '1 - 3年', '3 - 5年', '5年以上'],
  'wageRange': ['不限', '1000 - 5000', '5000 - 10000', '10000 - 20000', '20000以上']
}



module.exports = {
  randomMulti: (number = 16) => {
    let res = [];
    for (let i = 0; i < number; i++) res.push(jobList);
    return Mock.mock(res);
  },
  jobInfo: Mock.mock(jobInfo),
  jobScreening: Mock.mock(jobScreening)
};