const COMMIT_HASH_LENGTH = 7;

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
        writerOpts: {
          transform(commit, context) {
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

            const issues = [];
            let { subject } = commit;

            if (typeof subject === "string") {
              let url = context.repository
                ? `${context.host}/${context.owner}/${context.repository}`
                : context.repoUrl;

              if (url) {
                url = `${url}/issues/`;
                // Issue URLs.
                subject = subject.replace(/#([0-9]+)/g, (_, issue) => {
                  issues.push(issue);
                  return `[#${issue}](${url}${issue})`;
                });
              }

              if (context.host) {
                // User URLs.
                subject = subject.replace(
                  /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
                  (_, username) => {
                    if (username.includes("/")) {
                      return `@${username}`;
                    }

                    return `[@${username}](${context.host}/${username})`;
                  },
                );
              }
            }

            return {
              type: typeMap[commit.type],
              note: commit.notes,
              scope: commit.scope === "*" ? "" : commit.scope,
              shortHash:
                typeof commit.hash === "string"
                  ? commit.hash.substring(0, COMMIT_HASH_LENGTH)
                  : commit.shortHash,
              subject,
              // remove references that already appear in the subject
              references: commit.references.filter(
                (reference) => !issues.includes(reference.issue),
              ),
            };
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
