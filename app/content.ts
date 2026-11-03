// Everything the homepage and the CV say about the work, in one place so the
// two pages can never drift apart.

export type Media =
  | { kind: 'video'; src: string; poster: string; width: number; height: number }
  | { kind: 'figure'; src: string; alt: string; width: number; height: number; fit?: 'figure' | 'photo' };

export type Work = {
  id: string;
  kind: 'paper' | 'project';
  title: string;
  subtitle: string;
  /** Author list for a paper, or the role held on a project. */
  credit: string;
  /** Only where there is a real one to name. */
  venue?: string;
  /** Shown on the CV in place of a venue. */
  date?: string;
  description: string;
  media: Media;
  links: {
    project?: string;
    paper?: string;
    code?: string;
    models?: string;
    more?: { label: string; href: string }[];
  };
};

export const works: Work[] = [
  {
    id: 'freevideo',
    kind: 'project',
    title: 'FreeVideo',
    subtitle: 'Hardware‑adaptive inference for video generation models',
    credit: 'Bowen Xue, author and maintainer',
    description:
      'Runs MiniMax H3 on consumer GPUs with as little as 8 GB of VRAM, and is the platform that takes my future research straight to tens of thousands of users.',
    media: { kind: 'video', src: '/media/freevideo.mp4', poster: '/media/freevideo.webp', width: 832, height: 480 },
    links: {
      project: 'https://freevideo-community.pages.dev/',
      code: 'https://github.com/FlashML-org/FreeVideo',
    },
  },
  {
    id: 'uniaction',
    kind: 'paper',
    title: 'UniAction',
    subtitle: 'Unified Action Conditioning for World Models',
    credit: 'Bowen Xue*, Zizhang Li*, Hong-Xing Yu, and Jiajun Wu',
    date: 'Oct 2026',
    description:
      'Every action tells a world model what it is and where and when it acts, so one model can learn from all of them together and beat per‑action experts.',
    media: { kind: 'video', src: '/media/uniaction.mp4', poster: '/media/uniaction.webp', width: 832, height: 480 },
    links: {
      project: 'https://uniaction.github.io/',
      paper: 'https://arxiv.org/abs/2610.32977',
      code: 'https://github.com/KBRASK/UniAction',
      models: 'https://huggingface.co/BowenXue/UniAction',
    },
  },
  {
    id: 'ring-forcing',
    kind: 'paper',
    title: 'Ring Forcing',
    subtitle: 'Towards Precise Long‑Term Memory for Autoregressive Video Diffusion',
    credit:
      'Bowen Xue, Brandon Y. Feng, Chenguo Lin, Yuchen Lin, Yujia Zeng, Lvmin Zhang, Maneesh Agrawala, Honglei Yan, and Panwang Pan',
    venue: 'ECCV 2026',
    description:
      'Ring‑structured training teaches an autoregressive video model to retrieve distant history, so an object keeps its identity after leaving the frame for up to a minute.',
    media: { kind: 'video', src: '/media/ring-forcing.mp4', poster: '/media/ring-forcing.webp', width: 832, height: 480 },
    links: {
      project: 'https://ringforcing.com/',
      paper: 'https://arxiv.org/abs/2608.26794',
    },
  },
  {
    id: 'fourtune',
    kind: 'paper',
    title: 'FourTune',
    subtitle: 'Towards Fully 4‑Bit Efficient Post‑Training for Diffusion Models',
    credit:
      'Bowen Xue*, Zihan Min*, Xingyang Li*, Zhekai Zhang, Haocheng Xi, Lvmin Zhang, Maneesh Agrawala, Jun-Yan Zhu, Song Han, Yujun Lin, and Muyang Li',
    venue: 'ICML 2026',
    description:
      'Post‑trains diffusion models fully in 4 bits, matching full‑precision quality with 2.25× less memory and 2.27× the throughput of BF16 LoRA.',
    media: {
      kind: 'figure',
      src: '/media/fourtune.webp',
      alt: 'Backward pass with the output gradient quantised before it is multiplied by the transposed weights.',
      width: 760,
      height: 390,
    },
    links: {
      project: 'https://hanlab.mit.edu/projects/fourtune',
      paper: 'https://arxiv.org/abs/2607.05711',
    },
  },
  {
    id: 'stand-in',
    kind: 'paper',
    title: 'Stand-In',
    subtitle: 'A Lightweight and Plug‑and‑Play Identity Control for Video Generation',
    credit:
      'Bowen Xue*, Zheng-Peng Duan*, Qixin Yan, Wenjing Wang, Hao Liu, Chun-Le Guo, Chongyi Li, Chen Li, and Jing Lyu',
    venue: 'CVPR 2026',
    description:
      'Adds identity control to a pretrained video model through a lightweight reference‑image branch, training about 1% extra parameters on 2,000 pairs.',
    media: { kind: 'video', src: '/media/stand-in.mp4', poster: '/media/stand-in.webp', width: 832, height: 480 },
    links: {
      project: 'https://www.stand-in.tech/',
      paper: 'https://arxiv.org/abs/2508.07901',
      code: 'https://github.com/WeChatCV/Stand-In',
      models: 'https://huggingface.co/BowenXue/Stand-In',
    },
  },
  {
    id: 'nunchaku',
    kind: 'project',
    title: 'nunchaku',
    subtitle: 'Identity‑preserving image generation for 4‑bit FLUX.1‑dev',
    credit: 'Bowen Xue, contributor',
    description:
      'Added PuLID identity customization to nunchaku, a 4‑bit inference engine for diffusion models, and to its ComfyUI plugin.',
    media: {
      kind: 'figure',
      src: '/media/nunchaku.webp',
      alt: 'A reference portrait beside the image generated from it by the PuLID node in nunchaku.',
      width: 832,
      height: 468,
      fit: 'photo',
    },
    links: {
      code: 'https://github.com/nunchux-ai/nunchaku',
      more: [{ label: 'ComfyUI plugin', href: 'https://github.com/nunchux-ai/ComfyUI-nunchaku' }],
    },
  },
];

export const papers = works.filter((work) => work.kind === 'paper');
export const projects = works.filter((work) => work.kind === 'project');
