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

export const resetRenderer = {
  heading: function (text: string, level: string) {
    return `<h${level}><i class="title-ico"></i>${text}</h${level}>`;
  },
};

export const helpTemplate = `

## 快捷键

- Ctrl + B, 加粗
- Ctrl + I, 斜体
- Ctrl + D, 删除线
- Ctrl + U, 下划线
- Ctrl + L, 链接
- Ctrl + P, 图片
- Ctrl + O, 代码块
- Ctrl + Q, 引用

## 文本提示
输入@，接着输入标识单词会出现文本提示，也可 Ctrl + Space 主动触发提示。
![文本提示](${location.origin}/assets/images/suggestions.jpg)
`;


