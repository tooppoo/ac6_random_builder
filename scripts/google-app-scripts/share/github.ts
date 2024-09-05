const githubToken = import.meta.env.VITE_ISSUE_POST_TOKEN ?? ''
const githubRepository = import.meta.env.VITE_REPO_NAME ?? ''

type CreateIssueArgs = Readonly<{
  title: string
  text: string
}>
export function createIssue({
  title,
  text,
}: CreateIssueArgs): Promise<unknown> {
  return fetch(`https://api.github.com/repos/${githubRepository}/issues`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title,
      body: text,
      labels: ['bug'],
    }),
  })
}
