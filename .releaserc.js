module.exports = {
  branches: [{ name: "main" }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "breaking", release: "major" },
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "hotfix", release: "patch" },
          { type: "perf", release: "patch" },
        ],
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        writerOpts: {
          transform(commit) {
            const typeMap = {
              breaking: "💥 Breaking Change",
              feat: "✨ Feature",
              fix: "🐛 Bug Fix",
              refactor: "♻️ Refactoring",
              hotfix: "🚑 Hotfix",
              perf: "⚡ Performance",
            };

            // Skip unknown types
            if (!typeMap[commit.type]) return;

            // Format the type nicely for changelog sections
            commit.type = typeMap[commit.type];
            return commit;
          },
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): v${nextRelease.version} [skip ci]",
      },
    ],
    "@semantic-release/github",
  ],
};
