export const enAssemblyStore = {
  // TODO: キャプションをどこで管理するか整理
  caption: 'Assembly Store',
  notice: `<p>Assembles are stored by browser.</p>
<p>Assembly which is stored by this browser is not usable on other browser.</p>`,
  addNewData: {
    title: 'New Add',
    name: {
      caption: 'name',
    },
    description: {
      caption: 'description',
    },
    add: {
      caption: 'add',
    },
  },
  storedList: {
    title: 'stored assemblies',
    search: {
      caption: 'search by keywords(BAWS, blade)',
    },
    apply: {
      caption: 'apply',
    },
    delete: {
      caption: 'delete',
    },
    share: {
      caption: 'share',
    },
    restore: {
      caption: 'restore',
    },
    table: {
      col: {
        name: 'name',
        description: 'description',
      },
      state: {
        deleted: {
          caption: 'deleted',
        },
      },
    },
  },
}
