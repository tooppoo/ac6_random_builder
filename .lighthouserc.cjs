// 構文上moduleの定義が見つからないのを回避
// eslint-disable-next-line no-undef
module.exports = {
  collect: {
    url: ['http://localhost:4173/'],
    startServerCommand: 'npm run preview',
  },
  upload: {
    target: 'temporary-public-storage',
  },
}
