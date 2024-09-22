export const jaPageIndex = {
  command: {
    random: {
      label: 'ランダム設定',
      description: 'ランダムアセンの<br/>条件を設定する',
    },
    resetLock: {
      description: 'ロックを全て解除する',
    },
    filterForWhole: {
      label: '絞り込み',
      description: 'アセンブルの<br>条件を設定する',
    },
    share: {
      caption: "$t(share:command.target.caption, {'what': '現在のアセン'})",
      text: {
        label: 'コピー',
        description: '現在のアセンブルをコピー',
      },
    },
    report: {
      edit: 'ステータス表示を編集する',
      save: 'ステータス表示を保存する',
      reset: '元に戻す',
      showAll: '全て表示する',
      show: '表示する',
      hide: '表示しない',
    },
    store: {
      caption: 'アセンデータ管理',
    },
  },
  report: {
    bug: '不具合を報告する',
    request: '改修を依頼する',
  },
  language: {
    label: '言語',
  },
}
