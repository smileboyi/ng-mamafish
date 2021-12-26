import { languages, IRange } from 'monaco-editor-core';

export const createSuggestions = (range: IRange) => {
  const suggestions: languages.CompletionItem[] = [
    {
      label: '@table',
      kind: 27,
      detail: '表格',
      range,
      insertTextRules: 4,
      insertText: `\n| head1 | head1 |\n| ----- | ----- |\n| cell1 | cell2 |\n| cell4 | cell4 |\n`,
    },
    {
      label: '@code',
      kind: 27,
      detail: '代码片段',
      range,
      insertTextRules: 4,
      insertText: `\n\`\`\`js\n  console.log('hello world!');\n\`\`\`\n`,
    },
    {
      label: '@ul',
      kind: 27,
      detail: '无序列表',
      range,
      insertTextRules: 4,
      insertText: `\n- \n- \n- \n`,
    },
    {
      label: '@ol',
      kind: 27,
      detail: '有序列表',
      range,
      insertTextRules: 4,
      insertText: `\n1. \n2. \n3. \n`,
    },
    {
      label: '@ol',
      kind: 27,
      detail: '有序列表',
      range,
      insertTextRules: 4,
      insertText: `\n1. \n2. \n3. \n`,
    },
    {
      label: '@link',
      kind: 27,
      detail: '链接',
      range,
      insertTextRules: 4,
      insertText: `[]()`,
    },
    {
      label: '@image',
      kind: 27,
      detail: '图片',
      range,
      insertTextRules: 4,
      insertText: `![]()`,
    },
    {
      label: '@audio',
      kind: 27,
      detail: '音频',
      range,
      insertTextRules: 4,
      insertText: `\n<audio controls="" src="https://www.w3school.com.cn/i/horse.ogg"></audio>\n`,
    },
    {
      label: '@video',
      kind: 27,
      detail: '视频',
      range,
      insertTextRules: 4,
      insertText: `\n<video controls="" src="https://www.w3school.com.cn/i/movie.ogg"></video>\n`,
    },
  ];
  return suggestions;
};

export const template = `
## 南中荣橘柚
#### 柳宗元 〔唐代〕

橘柚怀贞质，受命此炎方。

密林耀朱绿，晚岁有馀芳。

殊风限清汉，飞雪滞故乡。

攀条何所叹，北望熊与湘。

![mahua](http://localhost:4200/assets/images/avatar.jpg)
`;
