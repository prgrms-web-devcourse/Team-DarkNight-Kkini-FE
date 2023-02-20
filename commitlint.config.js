module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'perf',
        'design',
        'docs',
        'chore',
        'build',
        'comment',
        'test',
      ],
    ],
    'subject-case': [0],
  },
};
