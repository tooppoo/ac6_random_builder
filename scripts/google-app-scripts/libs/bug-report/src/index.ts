import { createIssue } from '../../../share/github'

type FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit

async function onFormSubmit(e: FormsOnFormSubmit): Promise<void> {
  const [feature, summary, detail, media] = e.response.getItemResponses()

  const title = `[BUG] ${summary.getResponse()}`
  const mediaLinks = (() => {
    const res = media.getResponse()
    const prefix = 'https://drive.google.com/open?id='

    if (!Array.isArray(res)) {
      return [`${prefix}${res}`]
    }

    return res.map((id) => `${prefix}${id}`)
  })()
  const text = `
# 不具合のあった機能
${feature.getResponse()}

# 不具合のあった機能
${summary.getResponse()}

# 再現手順
${detail.getResponse()}

# 発生時の様子
${mediaLinks.map((l) => `- ${l}`).join('\n')}
`
  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  await createIssue({ title, text, labels: ['bug'] })
}

ScriptApp.newTrigger(onFormSubmit.name)
  .forForm(FormApp.getActiveForm())
  .onFormSubmit()
