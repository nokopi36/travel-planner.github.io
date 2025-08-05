#!/bin/bash

# ビルド実行
echo "Building the application..."
npm run build

# gh-pagesブランチが存在するかチェック
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "Switching to gh-pages branch..."
    git checkout gh-pages
else
    echo "Creating gh-pages branch..."
    git checkout --orphan gh-pages
fi

# 既存のファイルを削除（outフォルダ以外）
echo "Cleaning up old files..."
git rm -rf . 2>/dev/null || true

# outフォルダの内容をルートにコピー
echo "Copying build files..."
cp -r out/* .

# .nojekyllファイルを作成（Jekyllを無効化）
touch .nojekyll

# Gitに追加してコミット
echo "Committing changes..."
git add .
git commit -m "Deploy to GitHub Pages $(date)"

# リモートにプッシュ
echo "Pushing to GitHub..."
git push origin gh-pages --force

# mainブランチに戻る
echo "Returning to main branch..."
git checkout main

echo "Deployment completed!"