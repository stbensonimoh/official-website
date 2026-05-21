# Security Policy

## Reporting a Vulnerability

### For Critical Vulnerabilities

1. **Do not** create a public GitHub issue
2. Email [benson@stbensonimoh.com](mailto:benson@stbensonimoh.com) with "SECURITY VULNERABILITY" in the subject
3. Include a detailed description and steps to reproduce
4. Allow time for the vulnerability to be addressed before public disclosure

### For Non-Critical Security Issues

Submit a report via the [Security Vulnerability template](https://github.com/stbensonimoh/official-website/issues/new?template=security_vulnerability.md).

## Supported Versions

Only the latest version receives security updates.

## Cloudflare WAF

A Cloudflare WAF Custom Rule blocks reconnaissance and exploitation paths at the edge:

- Version control: `.git`, `.svn`
- Configuration: `.env`, `.config`, `.htaccess`, `.htpasswd`
- Infrastructure: `.aws`
- WordPress paths: `wp-login`, `wp-admin`, `wp-includes`, `wp-content`, `xmlrpc`
- Database: `phpmyadmin`
- OS metadata: `.DS_Store`

## Security Practices

- Public env vars use `PUBLIC_` prefix (Astro convention)
- No secrets committed to the repository
- Regular dependency updates
- Content Security Policy via HTTP headers (Cloudflare)
