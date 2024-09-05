import { Octokit } from 'octokit'

import {
  githubToken,
  githubOwner,
  githubRepository,
} from '../../../share/github.ts'

type FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit

async function onFormSubmit(e: FormsOnFormSubmit): Promise<void> {
  const [feature, summary, detail] = e.response.getItemResponses()

  const title = `[BUG] ${summary.getResponse()}`
  const body = `
# 機能
${feature.getResponse()}

# 詳細
${detail.getResponse()}
`
  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  const octokit = new Octokit({
    auth: githubToken,
  })

  await octokit.request(
    `POST /repos/${githubOwner}/${githubRepository}/issues`,
    {
      owner: githubOwner,
      repo: githubRepository,
      title,
      body,
      labels: ['bug'],
    },
  )
}

ScriptApp.newTrigger(onFormSubmit.name)
  .forForm(FormApp.getActiveForm())
  .onFormSubmit()
