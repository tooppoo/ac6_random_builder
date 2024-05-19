export const enPageIndex = {
  command: {
    random: {
      label: 'Random Assemble',
      description: 'Generate an assembly randomly',
    },
    resetLock: {
      description: 'reset all locks',
    },
    filterForWhole: {
      description: 'set conditions to assemble',
    },
    share: {
      caption: "$t(share:command.target.caption, {'what': 'Current Assembly'})",
      text: {
        label: 'Copy',
        description: 'Copy current assembly',
      },
    },
    report: {
      edit: 'edit status view',
      save: 'apply status view',
      reset: 'rollback',
      showAll: 'show all',
      show: 'show',
      hide: 'hide',
    },
    store: {
      caption: 'Assembly Store',
    },
  },
}
