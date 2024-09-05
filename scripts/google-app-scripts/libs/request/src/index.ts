import { createIssue } from 'share/github'

type FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit

async function onFormSubmit(e: FormsOnFormSubmit): Promise<void> {
  const [kind, detail, media] = e.response.getItemResponses()

  const title = `[BUG] ${detail.getResponse()}`
  const mediaLinks = (() => {
    const res = media.getResponse()
    const prefix = 'https://drive.google.com/open?id='

    if (!Array.isArray(res)) {
      return [`${prefix}${res}`]
    }

    return res.map((id) => `${prefix}${id}`)
  })()
  const text = `
# 要望の種類
${kind.getResponse()}

# 要望の内容
${detail.getResponse()}

# 要望のイメージ
${mediaLinks.map((l) => `- ${l}`).join('\n')}
`
  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  await createIssue({
    title,
    text,
    labels: (() => {
      switch (kind.getResponse()) {
        case '機能追加':
          return ['new_feature']
        case '機能変更':
        default:
          return ['enhancement']
      }
    })(),
  })
}

ScriptApp.newTrigger(onFormSubmit.name)
  .forForm(FormApp.getActiveForm())
  .onFormSubmit()
