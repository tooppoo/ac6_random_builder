export const jaAssemblyStore = {
  // TODO: キャプションをどこで管理するか整理
  caption: 'アセンデータ管理',
  notice: `<p>アセンブルはブラウザ単位で保存されます。</p>
<p>このブラウザで保存したデータは別ブラウザで利用できません。</p>`,
  addNewData: {
    title: '新規追加',
    name: {
      caption: 'アセン名',
    },
    description: {
      caption: '説明',
    },
    add: {
      caption: '追加',
    },
  },
  storedList: {
    title: '保存済みアセン',
    search: {
      caption: 'キーワード検索（例: 近接,レザスラ）',
    },
    apply: {
      caption: '反映する',
    },
    delete: {
      caption: '削除する',
    },
    restore: {
      caption: '元に戻す',
    },
    table: {
      col: {
        name: 'アセン名',
        description: '説明',
      },
      state: {
        deleted: {
          caption: '削除済み',
        },
      },
    },
  },
}
