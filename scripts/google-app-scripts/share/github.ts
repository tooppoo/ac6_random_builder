const githubToken = import.meta.env.ISSUE_POST_TOKEN ?? ''
const githubOwner = import.meta.env.REPO_OWNER ?? ''
const githubRepository = import.meta.env.REPO_NAME ?? ''

type CreateIssueArgs = Readonly<{
  title: string
  text: string
}>
export function createIssue({
  title,
  text,
}: CreateIssueArgs): Promise<unknown> {
  return fetch(
    `https://api.github.com/repos/${githubOwner}/${githubRepository}/issues`,
    {
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
    },
  )
}
