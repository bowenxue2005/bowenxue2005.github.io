import { experience, fullTitle, papers, plainText, projects, type Work } from '../content';
import { profile } from '../profile';
import { siteUrl } from '../site';

// /llms.txt (https://llmstxt.org): the whole site as one Markdown file, for
// AI assistants that fetch a page to answer a question about it. Built from
// the same data as the pages, so the two can never disagree.

// Required under `output: 'export'`.
export const dynamic = 'force-static';

function links(work: Work): string {
  const { project, paper, code, models, more = [] } = work.links;
  return [
    project && `Project: ${project}`,
    paper && `Paper: ${paper}`,
    code && `Code: ${code}`,
    models && `Models: ${models}`,
    ...more.map(({ label, href }) => `${label}: ${href}`),
  ].filter(Boolean).join('; ');
}

function body(): string {
  const { education: edu, profiles } = profile;
  return [
    `# ${profile.name} (${profile.nameZh})`,
    '',
    `> ${profile.summary}`,
    '',
    profile.summaryZh,
    '',
    `- Homepage: ${siteUrl}`,
    `- CV: ${siteUrl}/cv`,
    `- Email: ${profile.email}`,
    `- Google Scholar: ${profiles.scholar}`,
    `- GitHub: ${profiles.github}`,
    `- Hugging Face: ${profiles.huggingface}`,
    `- Research interests: ${profile.topics.join(', ')}`,
    '',
    '## Education',
    '',
    `- ${edu.school} (${edu.short}), ${edu.degree}, ${edu.when}. Expected graduation: ${edu.graduation}.`,
    '',
    '## Research experience',
    '',
    ...experience.map((item) =>
      `- ${item.org}, ${item.when}: ${item.role}${item.advisor ? ` with Prof. ${item.advisor}` : ''}. Topics: ${item.topics}.`),
    '',
    '## Publications',
    '',
    '`*` marks equal contribution.',
    '',
    ...papers.map((paper) =>
      `- **${fullTitle(paper)}**. ${paper.credit}. ${paper.venue ?? ['Preprint', paper.date].filter(Boolean).join(', ')}. ${plainText(paper.description)} ${links(paper)}`),
    '',
    '## Open-source projects',
    '',
    ...projects.map((project) =>
      `- **${fullTitle(project)}**. ${project.credit}. ${plainText(project.description)} ${links(project)}`),
    '',
  ].join('\n');
}

export function GET() {
  return new Response(body(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
