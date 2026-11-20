// Who the site is about, as plain data. The pages show it to people; the
// JSON-LD on each page and /llms.txt give the same facts to search engines
// and AI assistants, so they always match what a visitor reads.
import { siteUrl } from './site';

export const profile = {
  name: 'Bowen Xue',
  nameZh: '薛博文',
  givenName: 'Bowen',
  familyName: 'Xue',
  email: 'bowenxue2005@gmail.com',
  image: `${siteUrl}/avatar.jpg`,
  /** The meta description. */
  description:
    'Bowen Xue (薛博文), fourth-year undergraduate at USTC and research intern at Stanford, working on visual generation.',
  /** The opening of /llms.txt. Keep it in step with the bio on the homepage. */
  summary:
    'Bowen Xue (薛博文) is a fourth-year undergraduate in Computer Science at the University of Science and Technology of China (USTC) and a research intern with Prof. Jiajun Wu at Stanford University. Bowen Xue works on visual generation, with a focus on controllability and efficiency, previously interned at ByteDance, MIT HAN Lab and Tencent, and is applying to PhD programs for Fall 2027.',
  summaryZh:
    '薛博文（Bowen Xue），中国科学技术大学计算机科学与技术专业本科四年级学生，斯坦福大学吴佳俊（Jiajun Wu）教授组研究实习生，研究方向为视觉生成，关注可控性与效率。曾在字节跳动、MIT HAN Lab 和腾讯实习，正在申请 2027 年秋季入学的博士项目。',
  topics: [
    'Visual generation',
    'Video generation',
    'World models',
    'Diffusion models',
    'Controllable generation',
    'Efficient generative models',
    'Quantization',
  ],
  education: {
    school: 'University of Science and Technology of China',
    short: 'USTC',
    url: 'https://www.ustc.edu.cn/',
    degree: 'B.Eng. candidate in Computer Science and Technology',
    when: 'Sep 2023 – present',
    graduation: 'June 2027',
  },
  profiles: {
    scholar: 'https://scholar.google.com/citations?user=PLeb2oAAAAAJ&hl=en',
    github: 'https://github.com/KBRASK',
    huggingface: 'https://huggingface.co/BowenXue',
  },
};
