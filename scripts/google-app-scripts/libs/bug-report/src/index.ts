import { createIssue } from 'share/github'

type FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit

async function onFormSubmit(e: FormsOnFormSubmit): Promise<void> {
  const [feature, summary, detail] = e.response.getItemResponses()

  const title = `[BUG] ${summary.getResponse()}`
  const text = `
# 機能
${feature.getResponse()}

# 詳細
${detail.getResponse()}
`
  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  await createIssue({ title, text })
}

ScriptApp.newTrigger(onFormSubmit.name)
  .forForm(FormApp.getActiveForm())
  .onFormSubmit()
