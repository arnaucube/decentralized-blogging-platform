# decentralized-blogging-platform (DBP)

Decentralized blogging platform, using IPFS

![dbp](https://raw.githubusercontent.com/arnaucode/decentralized-blogging-platform/master/dbp-demo.gif "dbp-demo")

## Current status
- Project not finished, under development
- Deploying the images and the blog articles over IPFS works

### Instructions

- Need to add:
```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```
in order to allow access to IPFS from the app.

- Start the IPFS daemon
```
ipfs daemon
```

## Languages used

- GUI: Angularjs
- Client background: Go lang

## Third party tools

- IPFS https://ipfs.io/
- For the WYSIWYG editor, is used the medium-editor clone: https://github.com/yabwe/medium-editor
