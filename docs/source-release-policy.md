# Source integration and Production release

Decision: approved 2026-09-05; retain after the ecosystem integration.

Merging to `main` no longer automatically deploys Production for these projects. Production deployment requires a separately authorized release action.

This repository serves two Vercel projects. The Guide project reads `site/vercel.json`; its companion project reads root `vercel.json`. Both contain only the additive `git.deploymentEnabled.main = false` guard alongside existing configuration. The new root file adds no build or runtime override.

Unspecified branches remain enabled, preserving automatic PR and feature-branch Previews. Existing build settings, routes, assets, MFE configuration, snapshot behavior, environments and protection are unchanged. Manual deployment remains possible only through a separately authorized release.

The guard separates source merge authority from Production authority. The existing FDLC/Guide migration-bridge release process remains responsible for Production qualification, staged compatibility, promotion, observation and rollback. This integration does not initiate that process.

Qualification must record both projects' Preview deployment IDs and source SHAs, then verify unchanged Production identities and canonical aliases after merge. A successful Preview is not proof of a Production artifact.

Removal is not automatic. A future explicit deployment-policy decision must authorize a reviewed change removing or changing `main: false` in both configurations. That removal may itself trigger Production deployment when merged and must be reviewed accordingly.

[Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration) documents the branch-specific rule. The [ecosystem integration PR](https://github.com/jaydubya818/FDLC/pull/13) coordinates the framework, teaching and implementation layers without combining their release authority.
