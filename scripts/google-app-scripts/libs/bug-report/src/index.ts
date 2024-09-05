// import { Octokit } from 'octokit'
//
// import {
//   githubToken,
//   githubOwner,
//   githubRepository,
// } from '../../../share/github'

type FormsOnFormSubmit = GoogleAppsScript.Events.FormsOnFormSubmit

async function onFormSubmit(e: FormsOnFormSubmit): Promise<void> {
  const answers = e.response.getItemResponses().map((r) => r.getItem())

  // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#create-an-issue
  // const octokit = new Octokit({
  //   auth: githubToken,
  // })
  //
  // octokit.request(`POST /repos/${githubOwner}/${githubRepository}/issues`, {
  //   owner: githubOwner,
  //   repo: githubRepository,
  //   title: `[BUG]`,
  //   labels: ['bug'],
  // })
  console.log(answers)
}

ScriptApp.newTrigger(onFormSubmit.name)
  .forForm(FormApp.getActiveForm())
  .onFormSubmit()
