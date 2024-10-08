#!bin/bash

# Check if make is installed, otherwise install it
if ! [ -x "$(command -v make)" ]; then
  echo 'Error: make is not installed.' >&2
  brew cask install make
else
  echo 'Make is already installed'
fi

# check if direnv is installed, otherwise install it
if ! [ -x "$(command -v direnv)" ]; then
  echo 'Error: direnv is not installed.' >&2
  curl -sfL https://direnv.net/install.sh | bash
else 
  echo 'Direnv is already installed'
fi

# check if Migrate is installed, otherwise install it
if ! [ -x "$(command -v migrate)" ]; then
  echo 'Error: Migrate is not installed.' >&2
  brew install golang-migrate
else 
  echo 'Migrate is already installed'
fi

# check if node is installed, otherwise install it 
if ! [ -x "$(command -v node)" ]; then
  echo 'Error: Node is not installed.' >&2
  brew install node
else 
  echo 'Node is already installed'
fi

# check if pnpm is installed, otherwise install it
if ! [ -x "$(command -v pnpm)" ]; then
  echo 'Error: pnpm is not installed.' >&2
  npm install -g pnpm
else 
  echo 'pnpm is already installed'
fi

# check if jq is installed, otherwise install it
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed.' >&2
  brew install jq
else 
  echo 'jq is already installed'
fi