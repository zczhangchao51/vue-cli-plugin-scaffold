#!/bin/bash
set -e

echo "Select a option to release (input a serial number)："
echo

select VERSION in patch minor major "Specific Version"
  do
    echo
    if [[ $REPLY =~ ^[1-4]$ ]]; then
      if [[ $REPLY == 4 ]]; then
        read -p "Enter a specific version: " -r VERSION
        echo
        if [[ -z $REPLY ]]; then
          VERSION=$REPLY
        fi
      fi

      read -p "Release $VERSION - are you sure? (y/n) " -n 1 -r
      echo

      if [[ $REPLY =~ ^[Yy]$ || -z $REPLY ]]; then

        # bump version
        npm version $VERSION
        NEW_VERSION=$(node -p "require('./package.json').version")
        echo Releasing ${NEW_VERSION} ...
        
        # generate CHANGELOG
        npx conventional-changelog -p angular -r 2 -i CHANGELOG.md -s
        echo "✅ CHANGELOG.md generated"

        # commit changelog
        git add .
        git commit -m "chore: changelog"
      else
        echo Cancelled
      fi
      break
    else
      echo Invalid \"${REPLY}\"
      echo "To continue, please input a serial number(1-4) of an option."
      echo
    fi
  done

