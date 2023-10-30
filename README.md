# Sunbeam Extensions

## Installing an Extension

1. Select the script you want to install
2. Click on the `raw` button
3. Copy the URL in your clipboard
4. `sunbeam extension install <raw-url>`

## Example

To install the devdocs extension, use:

```sh
# install the extension
sunbeam extension install https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/devdocs.sh

# run the extension
sunbeam devdocs
```

Alternatively if you want to give it another name, pass the `--alias` flags

```sh
sunbeam extension install --alias docs https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/devdocs.sh
sunbeam docs
```

You can also run the extension without installing it using:

```sh
sunbeam run https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/devdocs.sh
```

## Catalog

| Extension                                                                                                   | Description                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Mac Apps](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/macapps.sh)          | Open your favorite apps         |
| [File Browser](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/files.py)        | Browse files and folders        |
| [Tailscale](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/tailscale.ts)       | Manage your tailscale devices   |
| [Manage Extensions](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/manage.sh)  | Manage Sunbeam Extensions       |
| [GitHub](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/github.sh)             | Search GitHub Repositories      |
| [Gist](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/gist.ts)                 | Manage your gists               |
| [Quick Links](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/quicklinks.sh)    | Open your favorite websites     |
| [Bitwarden Vault](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/bitwarden.sh) | List your Bitwarden passwords   |
| [VS Code](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/vscode.ts)            | Manage your VS Code projects    |
| [Meteo](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/meteo.sh)               | Show Meteo                      |
| [System](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/system.sh)             | Control your system             |
| [Browse TLDR Pages](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/tldr.sh)    | Browse TLDR Pages               |
| [Edit Config Files](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/config.sh)  | Edit your favorite config files |
| [Val Town](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/valtown.sh)          | Manage your Vals                |
| [RSS](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/rss.ts)                   | Manage your RSS feeds           |
| [Cli Apps](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/apps.sh)             | Open your favorite cli apps     |
| [DevDocs](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/devdocs.sh)           | Search DevDocs.io               |
| [Raindrop](https://raw.githubusercontent.com/pomdtr/sunbeam-extensions/main/extensions/raindrop.ts)         | Manage your raindrop bookmarks  |
