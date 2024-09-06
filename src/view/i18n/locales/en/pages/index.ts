export const enPageIndex = {
  command: {
    random: {
      label: 'Random Assemble',
      description: 'Generate an assembly randomly',
    },
    resetLock: {
      description: 'Reset all locks',
    },
    filterForWhole: {
      description: 'Set conditions to assemble',
    },
    share: {
      caption: "$t(share:command.target.caption, {'what': 'Current Assembly'})",
      text: {
        label: 'Copy',
        description: 'Copy current assembly',
      },
    },
    report: {
      edit: 'Edit status view',
      save: 'Apply status view',
      reset: 'Rollback',
      showAll: 'Show all',
      show: 'Show',
      hide: 'Hide',
    },
    store: {
      caption: 'Store Assembly',
    },
  },
  report: {
    bug: 'Report Bug',
    request: 'Request Change',
  },
  language: {
    label: 'Language',
  },
}
