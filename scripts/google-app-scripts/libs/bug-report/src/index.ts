import { createIssue } from 'share/github'

type FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit

async function onFormSubmit(e: FormsOnFormSubmit): Promise<void> {
  const [feature, summary, detail, ...medias] = e.response.getItemResponses()

  const title = `[BUG] ${summary.getResponse()}`
  const text = `
# 機能
${feature.getResponse()}

# 再現手順
${detail.getResponse()}

# 発生時の様子
`
  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  await createIssue({ title, text })

  medias.forEach((m) => {
    console.log(m.getItem().getId())
    console.log(m.getItem().getTitle())
    console.log(m.getResponse())
    console.log('-------------')
  })
}

ScriptApp.newTrigger(onFormSubmit.name)
  .forForm(FormApp.getActiveForm())
  .onFormSubmit()
