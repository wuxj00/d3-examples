export const menus: object[] = [
  {
    name: '测试1',
  }, {
    name: '测试2',
    list: [
      {
        name: '测试2-1',
      }, {
        name: '测试2-2',
      },
    ],
  },
];

const monthData = ['一季度', '二季度', '三季度', '四季度'];
const counties = ['CHN', 'USA', 'JAP', 'UK', 'BRAZ'];

export const groupData = counties.map((name) => {
  const listData = monthData.map((mouth) => {
    return {

    };
  });
  return {
    State: name,
  };
});
