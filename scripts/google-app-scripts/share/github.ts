type CreateIssueArgs = Readonly<{
  title: string
  text: string
  labels: string[]
}>
export function createIssue({ title, text, labels }: CreateIssueArgs): unknown {
  return UrlFetchApp.fetch(
    `https://api.github.com/repos/${import.meta.env.VITE_REPO_NAME}/issues`,
    {
      method: 'post',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${import.meta.env.VITE_ISSUE_POST_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      payload: JSON.stringify({
        title,
        body: text,
        labels,
      }),
    },
  )
}
